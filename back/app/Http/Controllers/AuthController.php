<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Artisan;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\DB;
use App\Models\RefreshedToken;
use App\Services\UserService;

class AuthController extends Controller
{
    private $userService;
    public function __construct(UserService $userService){
        $this->userService = $userService;
    }
    public function register(Request $request)
    {
        $data = $request->validate([
            'nom' => ['required', 'max:50'],
            'prenom' => ['required', 'max:50'],
            'email' => ['required', 'email', 'unique:users', 'max:50'],
            'password' => ['required', 'confirmed', Password::min(8)],
            'role' => ['required', Rule::in(['CLIENT','ARTISAN'])],
            'domaine' =>['max:50', 'required_if:role,ARTISAN'],
            'specialite' =>['required_if:role,ARTISAN','max:50'],
            'disponible' =>['required_if:role,Artisan','boolean:strict'],
            'telephone' =>['required_if:role,ARTISAN', 'string']
        ]);
        $user = $this->userService->register($data);

        $token = $user->createToken('access_token', ['role'=>strtolower($data['role'])])->plainTextToken;

        return response()->json([
            'message' => 'Compte créé avec succès.',
            'accessToken'   => $token,
            'user'    => $user,
        ], 201);
    }

    // -------------------------------------------------------------------------
    // LOGIN
    // -------------------------------------------------------------------------

    public function login(Request $request): JsonResponse
    {
        $data = $request->validate([
            'email'        => ['required', 'email'],
            'mot_de_passe' => ['required', 'string'],
        ]);

        $user = User::where('email', $data['email'])->first();

        if (! $user || ! Hash::check($data['mot_de_passe'], $user->mot_de_passe)) {
            throw ValidationException::withMessages([
                'email' => ['Les identifiants sont incorrects.'],
            ]);
        }

        // Révoque les anciens tokens pour n'avoir qu'une session active
        $user->tokens()->delete();

        $abilities = match ($user->role) {
            'CLIENT'  => ['role:client'],
            'ARTISAN' => ['role:artisan'],
            default   => [],
        };

        $token = $user->createToken('auth_token', $abilities)->plainTextToken;

        return $this->respond_with_token($token,$user);
        return response()->json([
            'message' => 'Connexion réussie.',
            'token'   => $token,
            'user'    => $this->formatUser($user->load('artisan.atelier')),
        ]);
    }

    public function logout() {}

    public function refresh(Request $request)
    {
        $rawtoken = $request->cookie('refresh_token');

        if (!$rawtoken) {
            return response()->json(['error' => 'No refresh token'], 401);
        }

        $hash = hash('sha256', $rawtoken);
        $refresh_token = RefreshedToken::where('refresh_token_hash', $hash)->where('expire_at', '>', now())->first();

        if (!$refresh_token) {
            return response()->json(['error' => 'Invalid or expired refreshed_ token'], 401);
        }


        $user = User::find($refresh_token->user_id);
        if (!$user) {
            return response()->json(['error' => 'User no longer exists'], 401);
        }
        $newAccessToken = auth('api')->login($user);

        $refresh_token->delete();

        return $this->respond_with_token($newAccessToken, $user);
    }

    protected function respond_with_token($token, $user)
    {
        $refresh_token = bin2hex(random_bytes(64));
        $refresh_token_hash = hash('sha256', $refresh_token);
        RefreshedToken::create([
            'user_id' => $user->id,
            'refresh_token_hash' => $refresh_token_hash,
            'expire_at' => now()->addDay(30)
        ]);
        $cookie = cookie('refresh_token', $refresh_token, 60 * 24 * 30, '/', null, false, true, false, null);
        return response()->json([
            'accessToken' => $token,
            'user' =>  $this->formatUser($user->load('artisan')),
        ])->withCookie($cookie);
    }
}
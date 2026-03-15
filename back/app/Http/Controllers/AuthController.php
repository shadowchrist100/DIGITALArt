<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Artisan;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Illuminate\Support\Facades\DB;


class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => ['required', 'email', 'max:50'],
            'password' => ['required', Password::min(6)]
        ]);
        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Unauthorized'], 401);
        }
        $user = User::where('email', $credentials['email'])->first();
        // return $this->respond_with_token($token,$user);
        // $credentials = $request->only('email', 'password');
        // $credentials
        // $token =$user = [];

        $token = $user->createToken('auth_token', ['role:client'])->plainTextToken;

        return response()->json([
            'message' => 'Compte client créé avec succès.',
            'token'   => $token,
            'user'    => $this->formatUser($user),
        ], 201);
    }

    public function register(Request $request)
    {
        $credentials = $request->validate([
            'nom' => ['required', 'max:50'],
            'prenom' => ['required', 'max:50'],
            'email' => ['required', 'email', 'unique:users', 'max:50'],
            'password' => ['required', 'confirmed', Password::min(6)],
            'role' => ['required'],
            'photo_profil' => ['mimes:jpg,jpeg,svg,png']
        ]);

        $user = User::create($credentials);
        
        $token = auth('api')->login($user);

        // Transaction pour garantir l'atomicité
        $user = \DB::transaction(function () use ($data) {
            $user = User::create([
                'nom'          => $data['nom'],
                'prenom'       => $data['prenom'],
                'email'        => $data['email'],
                'mot_de_passe' => Hash::make($data['mot_de_passe']),
                'photo_profil' => $data['photo_profil'] ?? null,
                'role'         => 'ARTISAN',
            ]);

            $user->artisan()->create([
                'telephone' => $data['telephone'],
            ]);

            return $user;
        });

        $token = $user->createToken('auth_token', ['role:artisan'])->plainTextToken;

        return response()->json([
            'message' => 'Compte artisan créé avec succès.',
            'token'   => $token,
            'user'    => $this->formatUser($user->load('artisan')),
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
            'token_type' => 'Bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user' => $user
        ])->withCookie($cookie);
    }
}
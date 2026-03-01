<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\Artisan;
use App\Models\RefreshedToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class AuthController extends Controller
{
    // ──────────────────────────────────────────────────────────────────────────
    // REGISTER
    // ──────────────────────────────────────────────────────────────────────────
    public function register(Request $request)
    {
        $credentials = $request->validate([
            'nom'                   => ['required', 'max:50'],
            'prenom'                => ['required', 'max:50'],
            'email'                 => ['required', 'email', 'unique:users', 'max:50'],
            'password'              => ['required', 'confirmed', Password::min(6)],
            'role'                  => ['required', 'in:CLIENT,ARTISAN'],
            'photo_profil'          => ['nullable', 'mimes:jpg,jpeg,svg,png'],
            // Champs artisan
            'phone'                 => ['nullable', 'string', 'max:20'],
            'specialty'             => ['nullable', 'string', 'max:50'],
        ]);

        // Créer l'utilisateur
        $user = User::create([
            'nom'       => $credentials['nom'],
            'prenom'    => $credentials['prenom'],
            'email'     => $credentials['email'],
            'password'  => $credentials['password'],
            'role'      => $credentials['role'],
            'specialite'=> $credentials['specialty'] ?? null,
        ]);

        // Si artisan → créer l'entrée dans la table artisans
        if ($credentials['role'] === 'ARTISAN') {
            Artisan::create([
                'user_id'   => $user->id,
                'telephone' => $credentials['phone'] ?? null,
            ]);
        }

        $token = auth('api')->login($user);

        return $this->respondWithToken($token, $user);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // LOGIN
    // ──────────────────────────────────────────────────────────────────────────
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email'    => ['required', 'email', 'max:50'],
            'password' => ['required'],
        ]);

        if (!$token = auth('api')->attempt($credentials)) {
            return response()->json(['error' => 'Email ou mot de passe incorrect'], 401);
        }

        $user = auth('api')->user();

        return $this->respondWithToken($token, $user);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // LOGOUT
    // ──────────────────────────────────────────────────────────────────────────
    public function logout(Request $request)
    {
        // Supprimer le refresh token du cookie
        $refreshToken = $request->cookie('refresh_token');

        if ($refreshToken) {
            $hash = hash('sha256', $refreshToken);
            RefreshedToken::where('refresh_token_hash', $hash)->delete();
        }

        auth('api')->logout();

        return response()->json(['message' => 'Déconnexion réussie'])
            ->withCookie(cookie()->forget('refresh_token'));
    }

    // ──────────────────────────────────────────────────────────────────────────
    // REFRESH — renouvelle l'access token via le refresh token en cookie
    // ──────────────────────────────────────────────────────────────────────────
    public function refresh(Request $request)
    {
        $refreshToken = $request->cookie('refresh_token');

        if (!$refreshToken) {
            return response()->json(['error' => 'Refresh token manquant'], 401);
        }

        $hash = hash('sha256', $refreshToken);

        $tokenRecord = RefreshedToken::where('refresh_token_hash', $hash)
            ->where('expire_at', '>', now())
            ->first();

        if (!$tokenRecord) {
            return response()->json(['error' => 'Refresh token invalide ou expiré'], 401);
        }

        $user = User::find($tokenRecord->user_id);

        if (!$user) {
            return response()->json(['error' => 'Utilisateur introuvable'], 401);
        }

        // Supprimer l'ancien refresh token (rotation)
        $tokenRecord->delete();

        // Générer un nouvel access token
        $newAccessToken = auth('api')->login($user);

        return $this->respondWithToken($newAccessToken, $user);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // ME — retourne l'utilisateur connecté
    // ──────────────────────────────────────────────────────────────────────────
    public function me()
    {
        $user = auth('api')->user();

        if (!$user) {
            return response()->json(['error' => 'Non authentifié'], 401);
        }

        // Charger le profil artisan si besoin
        if ($user->role === 'ARTISAN') {
            $user->load('artisan');
        }

        return response()->json(['user' => $user]);
    }

    // ──────────────────────────────────────────────────────────────────────────
    // HELPER — construit la réponse avec access token + cookie refresh token
    // ──────────────────────────────────────────────────────────────────────────
    protected function respondWithToken(string $token, User $user)
    {
        // Générer un refresh token sécurisé
        $refreshToken     = bin2hex(random_bytes(64));
        $refreshTokenHash = hash('sha256', $refreshToken);

        // Supprimer les anciens refresh tokens de cet utilisateur (optionnel)
        RefreshedToken::where('user_id', $user->id)
            ->where('expire_at', '<', now())
            ->delete();

        RefreshedToken::create([
            'user_id'             => $user->id,
            'refresh_token_hash'  => $refreshTokenHash,
            'expire_at'           => now()->addDays(30),
        ]);

        // Cookie HttpOnly, 30 jours
        $cookie = cookie(
            'refresh_token',
            $refreshToken,
            60 * 24 * 30,   // minutes
            '/',
            null,
            false,          // secure (mettre true en prod avec HTTPS)
            true,           // httpOnly
            false,
            'Lax'
        );

        // Charger les relations utiles
        if ($user->role === 'ARTISAN') {
            $user->load('artisan');
        }

        return response()->json([
            'accesToken'  => $token,               // ← nom identique à AuthContext.jsx
            'token_type'  => 'Bearer',
            'expires_in'  => auth('api')->factory()->getTTL() * 60,
            'user'        => $user,                // ← nom identique à AuthContext.jsx
        ])->withCookie($cookie);
    }
}
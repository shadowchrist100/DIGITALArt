<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Artisan;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ArtisanProfileController extends Controller
{
    // ── GET /api/artisan/profile ───────────────────────────────────────────────
    public function show()
    {
        $user = Auth::user()->load('artisan');

        return response()->json([
            'user' => [
                'id'                  => $user->id,
                'nom'                 => $user->nom,
                'prenom'              => $user->prenom,
                'email'               => $user->email,
                'role'                => $user->role,
                'bio'                 => $user->bio,
                'specialite'          => $user->specialite,
                'experience_level'    => $user->experience_level,
                'verification_status' => $user->verification_status,
                'photo_profil'        => $user->photo_profil,
                'telephone'           => $user->artisan?->telephone,
                'created_at'          => $user->created_at,
                'stats'               => [
                    'services'     => 0, // à remplir quand la table services existe
                    'appointments' => 0,
                    'reviews'      => $user->avisRecus()->count(),
                ],
                'rating'              => $user->avisRecus()->count() > 0
                    ? round($user->avisRecus()->avg('note'), 1)
                    : null,
            ],
        ], 200);
    }

    // ── PUT /api/artisan/profile ───────────────────────────────────────────────
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'nom'              => 'sometimes|string|max:100',
            'prenom'           => 'sometimes|string|max:100',
            'bio'              => 'nullable|string',
            'specialite'       => 'nullable|string|max:100',
            'experience_level' => 'nullable|string|in:debutant,intermediaire,expert',
            'photo_profil'     => 'nullable|string',   // URL ou base64
            'telephone'        => 'nullable|string|max:20',
        ]);

        // Mettre à jour User
        $user->update(collect($validated)->except('telephone')->toArray());

        // Mettre à jour ou créer Artisan (téléphone)
        if (isset($validated['telephone'])) {
            Artisan::updateOrCreate(
                ['user_id' => $user->id],
                ['telephone' => $validated['telephone']]
            );
        }

        $user->load('artisan');

        return response()->json([
            'message' => 'Profil mis à jour avec succès',
            'user'    => [
                'id'               => $user->id,
                'nom'              => $user->nom,
                'prenom'           => $user->prenom,
                'email'            => $user->email,
                'role'             => $user->role,
                'bio'              => $user->bio,
                'specialite'       => $user->specialite,
                'experience_level' => $user->experience_level,
                'photo_profil'     => $user->photo_profil,
                'telephone'        => $user->artisan?->telephone,
            ],
        ], 200);
    }
}
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class ArtisanListController extends Controller
{
    /**
     * GET /api/artisans
     * Paramètres acceptés :
     *   search       → nom, prenom ou specialite
     *   location     → ville (champ à ajouter) ou on cherche dans bio pour l'instant
     *   specialty    → specialite exacte
     *   min_rating   → note minimale (quand les avis seront liés)
     *   availability → all | immediate | week | month
     *   page         → numéro de page (défaut 1)
     *   per_page     → résultats par page (défaut 9, max 30)
     */
    public function index(Request $request)
    {
        $perPage = min((int) $request->get('per_page', 9), 30);

        $query = User::where('role', 'ARTISAN')
            ->with('artisan')   // charge telephone
            ->select([
                'id', 'nom', 'prenom', 'email',
                'specialite', 'bio', 'photo_profil',
                'verification_status', 'verified_at',
                'created_at',
            ]);

        // ── Filtre recherche (nom, prenom, specialite) ────────────────────────
        if ($search = $request->get('search')) {
            $query->where(function ($q) use ($search) {
                $q->where('nom',        'like', "%{$search}%")
                  ->orWhere('prenom',   'like', "%{$search}%")
                  ->orWhere('specialite','like', "%{$search}%");
            });
        }

        // ── Filtre spécialité ─────────────────────────────────────────────────
        if ($specialty = $request->get('specialty')) {
            $query->where('specialite', 'like', "%{$specialty}%");
        }

        // ── Filtre localisation (dans bio pour l'instant) ─────────────────────
        if ($location = $request->get('location')) {
            $query->where('bio', 'like', "%{$location}%");
        }

        // ── Filtre statut de vérification ─────────────────────────────────────
        if ($request->get('verified_only')) {
            $query->where('verification_status', 'verified');
        }

        // ── Filtre disponibilité ──────────────────────────────────────────────
        // (à implémenter quand le champ disponibilité sera ajouté)
        // if ($availability = $request->get('availability')) { ... }

        // ── Tri ───────────────────────────────────────────────────────────────
        $query->orderBy('verified_at', 'desc')
              ->orderBy('created_at',  'desc');

        // ── Pagination ────────────────────────────────────────────────────────
        $paginated = $query->paginate($perPage);

        // ── Formater la réponse ───────────────────────────────────────────────
        $data = $paginated->getCollection()->map(function ($user) {
            return [
                'id'                  => $user->id,
                'name'                => $user->prenom . ' ' . $user->nom,
                'prenom'              => $user->prenom,
                'nom'                 => $user->nom,
                'email'               => $user->email,
                'specialty'           => $user->specialite,
                'specialite'          => $user->specialite,
                'bio'                 => $user->bio,
                'photo'               => $user->photo_profil,
                'phone'               => $user->artisan?->telephone,
                'verified'            => $user->verification_status === 'verified',
                'verification_status' => $user->verification_status,
                'available'           => true,  // à rendre dynamique plus tard
                'rating'              => null,  // à calculer depuis la table avis
                'reviews'             => 0,     // à calculer depuis la table avis
                'price'               => null,  // à ajouter dans la table artisans
                'member_since'        => $user->created_at?->format('F Y'),
            ];
        });

        return response()->json([
            'data'         => $data,
            'total'        => $paginated->total(),
            'per_page'     => $paginated->perPage(),
            'current_page' => $paginated->currentPage(),
            'last_page'    => $paginated->lastPage(),
        ]);
    }
}
<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class FeaturedController extends Controller
{
    /**
     * GET /api/artisans/featured
     * Retourne les 3 artisans les mieux notés
     */
    public function index()
    {
        $artisans = User::where('role', 'ARTISAN')
            ->where('verification_status', 'verified')
            ->withCount('avisRecus')
            ->withAvg('avisRecus', 'note')
            ->having('avis_recus_count', '>', 0) // Au moins 1 avis
            ->orderByDesc('avis_recus_avg_note')
            ->orderByDesc('avis_recus_count')
            ->limit(3)
            ->get()
            ->map(function ($artisan) {
                return [
                    'id'         => $artisan->id,
                    'nom'        => $artisan->nom,
                    'prenom'     => $artisan->prenom,
                    'specialite' => $artisan->specialite,
                    'photo'      => $artisan->photo_profil,
                    'rating'     => round($artisan->avis_recus_avg_note, 1),
                    'reviews'    => $artisan->avis_recus_count,
                ];
            });

        return response()->json([
            'artisans' => $artisans,
        ], 200);
    }
}
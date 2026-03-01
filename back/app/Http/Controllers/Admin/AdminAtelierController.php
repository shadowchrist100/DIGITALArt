<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Atelier;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAtelierController extends Controller
{
    /**
     * Lister tous les ateliers.
     * GET /api/admin/ateliers
     * Params: domaine, localisation, suspendu, search, par_page
     */
    public function index(Request $request): JsonResponse
    {
        $ateliers = Atelier::with('artisan.utilisateur:id,nom,prenom,email')
            ->withCount('avis')
            ->withAvg('avis', 'note')
            ->withCount('services')
            ->withCount('rendezVous')
            ->when($request->domaine, fn($q) => $q->where('domaine', 'ilike', "%{$request->domaine}%"))
            ->when($request->localisation, fn($q) => $q->where('localisation', 'ilike', "%{$request->localisation}%"))
            ->when($request->search, fn($q) => $q->where('nom', 'ilike', "%{$request->search}%"))
            ->when($request->suspendu !== null, fn($q) => $q->where('suspendu', $request->boolean('suspendu')))
            ->orderByDesc('created_at')
            ->paginate($request->par_page ?? 20);

        return response()->json($ateliers);
    }

    /**
     * Détail complet d'un atelier.
     * GET /api/admin/ateliers/{id}
     */
    public function show(int $id): JsonResponse
    {
        $atelier = Atelier::with([
            'artisan.utilisateur',
            'offres',
            'galerie',
            'oeuvres',
            'avis.client:id,nom,prenom',
        ])
        ->withCount(['avis', 'services', 'rendezVous', 'oeuvres'])
        ->findOrFail($id);

        $noteMoyenne = $atelier->avis->avg('note');

        $stats = [
            'note_moyenne'        => round($noteMoyenne ?? 0, 1),
            'total_avis'          => $atelier->avis_count,
            'total_services'      => $atelier->services_count,
            'total_rdv'           => $atelier->rendez_vous_count,
            'total_oeuvres'       => $atelier->oeuvres_count,
            'services_termines'   => $atelier->services()->where('statut', 'TERMINE')->count(),
            'services_en_attente' => $atelier->services()->where('statut', 'EN_ATTENTE')->count(),
        ];

        return response()->json([
            'atelier' => $atelier,
            'stats'   => $stats,
        ]);
    }

    /**
     * Suspendre un atelier.
     * PATCH /api/admin/ateliers/{id}/suspendre
     */
    public function suspendre(int $id): JsonResponse
    {
        $atelier = Atelier::findOrFail($id);
        $atelier->update(['suspendu' => true]);

        return response()->json(['message' => "Atelier « {$atelier->nom} » suspendu."]);
    }

    /**
     * Réactiver un atelier suspendu.
     * PATCH /api/admin/ateliers/{id}/reactiver
     */
    public function reactiver(int $id): JsonResponse
    {
        $atelier = Atelier::findOrFail($id);
        $atelier->update(['suspendu' => false]);

        return response()->json(['message' => "Atelier « {$atelier->nom} » réactivé."]);
    }

    /**
     * Supprimer un atelier (et tout son contenu en cascade).
     * DELETE /api/admin/ateliers/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        $atelier = Atelier::findOrFail($id);
        $nom     = $atelier->nom;
        $atelier->delete();

        return response()->json(['message' => "Atelier « {$nom} » supprimé définitivement."]);
    }
}

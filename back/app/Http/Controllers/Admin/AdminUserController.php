<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminUserController extends Controller
{
    /**
     * Lister tous les utilisateurs avec filtres.
     * GET /api/admin/users
     * Params: role, search, suspendu, par_page
     */
    public function index(Request $request): JsonResponse
    {
        $request->validate([
            'role'     => ['nullable', 'in:CLIENT,ARTISAN,ADMIN'],
            'par_page' => ['nullable', 'integer', 'between:1,100'],
        ]);

        $users = User::with('artisan.atelier:id,artisan_id,nom,domaine')
            ->when($request->role, fn($q) => $q->where('role', $request->role))
            ->when($request->search, fn($q) => $q->where(function ($q) use ($request) {
                $q->where('nom', 'ilike', "%{$request->search}%")
                  ->orWhere('prenom', 'ilike', "%{$request->search}%")
                  ->orWhere('email', 'ilike', "%{$request->search}%");
            }))
            ->when($request->suspendu !== null, fn($q) => $q->where('suspendu', $request->boolean('suspendu')))
            ->orderByDesc('created_at')
            ->paginate($request->par_page ?? 20);

        return response()->json($users);
    }

    /**
     * Détail d'un utilisateur.
     * GET /api/admin/users/{id}
     */
    public function show(int $id): JsonResponse
    {
        $user = User::with([
            'artisan.atelier.offres',
            'artisan.atelier.avis',
        ])->findOrFail($id);

        // Statistiques selon le rôle
        $stats = [];

        if ($user->role === 'CLIENT') {
            $stats = [
                'total_rdv'               => $user->rendezVous()->count(),
                'total_services'          => $user->services()->count(),
                'total_services_immediats'=> $user->servicesImmediats()->count(),
                'total_avis'              => $user->avis()->count(),
            ];
        }

        if ($user->role === 'ARTISAN' && $user->artisan?->atelier) {
            $atelier = $user->artisan->atelier;
            $stats = [
                'total_rdv'      => $atelier->rendezVous()->count(),
                'total_services' => $atelier->services()->count(),
                'total_avis'     => $atelier->avis()->count(),
                'note_moyenne'   => round($atelier->avis()->avg('note') ?? 0, 1),
                'total_oeuvres'  => $atelier->oeuvres()->count(),
            ];
        }

        return response()->json([
            'user'  => $user,
            'stats' => $stats,
        ]);
    }

    /**
     * Suspendre un utilisateur (désactive son accès).
     * PATCH /api/admin/users/{id}/suspendre
     */
    public function suspendre(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        if ($user->role === 'ADMIN') {
            return response()->json(['message' => 'Impossible de suspendre un administrateur.'], 403);
        }

        if ($user->id === $request->user()->id) {
            return response()->json(['message' => 'Vous ne pouvez pas vous suspendre vous-même.'], 403);
        }

        $user->update(['suspendu' => true]);

        // Révoquer tous ses tokens
        $user->tokens()->delete();

        return response()->json(['message' => "Compte de {$user->prenom} {$user->nom} suspendu."]);
    }

    /**
     * Réactiver un utilisateur suspendu.
     * PATCH /api/admin/users/{id}/reactiver
     */
    public function reactiver(int $id): JsonResponse
    {
        $user = User::findOrFail($id);
        $user->update(['suspendu' => false]);

        return response()->json(['message' => "Compte de {$user->prenom} {$user->nom} réactivé."]);
    }

    /**
     * Supprimer définitivement un utilisateur.
     * DELETE /api/admin/users/{id}
     */
    public function destroy(Request $request, int $id): JsonResponse
    {
        $user = User::findOrFail($id);

        if ($user->role === 'ADMIN') {
            return response()->json(['message' => 'Impossible de supprimer un administrateur.'], 403);
        }

        if ($user->id === $request->user()->id) {
            return response()->json(['message' => 'Vous ne pouvez pas supprimer votre propre compte.'], 403);
        }

        $user->tokens()->delete();
        $user->delete();

        return response()->json(['message' => 'Utilisateur supprimé définitivement.']);
    }

    /**
     * Changer le rôle d'un utilisateur.
     * PATCH /api/admin/users/{id}/role
     */
    public function changerRole(Request $request, int $id): JsonResponse
    {
        $request->validate([
            'role' => ['required', 'in:CLIENT,ARTISAN,ADMIN'],
        ]);

        $user = User::findOrFail($id);

        if ($user->id === $request->user()->id) {
            return response()->json(['message' => 'Vous ne pouvez pas changer votre propre rôle.'], 403);
        }

        $user->update(['role' => $request->role]);
        $user->tokens()->delete(); // Forcer reconnexion

        return response()->json([
            'message' => "Rôle changé en {$request->role} pour {$user->prenom} {$user->nom}.",
            'user'    => $user->fresh(),
        ]);
    }
}

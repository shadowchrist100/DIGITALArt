<?php

namespace App\Http\Controllers;

use App\Models\Atelier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AtelierController extends Controller
{
    // ── Mon atelier (artisan connecté) ────────────────────────────────────────
    public function myAtelier()
    {
        $atelier = Atelier::where('user_id', Auth::id())
            ->with(['offres', 'avis'])
            ->first();

        if (!$atelier) {
            return response()->json(['atelier' => null], 200);
        }

        return response()->json(['atelier' => $atelier], 200);
    }

    // ── Créer un atelier ──────────────────────────────────────────────────────
    public function store(Request $request)
    {
        // Un artisan ne peut avoir qu'un seul atelier
        $existing = Atelier::where('user_id', Auth::id())->first();
        if ($existing) {
            return response()->json([
                'message' => 'Vous avez déjà un atelier.',
                'atelier' => $existing,
            ], 409);
        }

        $validated = $request->validate([
            'nom'              => 'required|string|max:150',
            'description'      => 'required|string',
            'domaine'          => 'required|string|max:100',
            'localisation'     => 'required|string|max:255',
            'image_principale' => 'nullable|string',
        ]);

        $atelier = Atelier::create([
            'user_id'             => Auth::id(),
            'verification_status' => 'pending',
            ...$validated,
        ]);

        return response()->json([
            'message' => 'Atelier créé avec succès. En attente d\'approbation admin.',
            'atelier' => $atelier,
        ], 201);
    }

    // ── Voir l'atelier public d'un artisan (par user_id) ─────────────────────
    public function showByUser($userId)
    {
        $atelier = Atelier::where('user_id', $userId)
            ->where('verification_status', 'approved')
            ->with(['offres', 'avis.user'])
            ->first();

        if (!$atelier) {
            return response()->json(['atelier' => null], 200);
        }

        return response()->json(['atelier' => $atelier], 200);
    }

    // ── Modifier son atelier ──────────────────────────────────────────────────
    public function update(Request $request, $id)
    {
        $atelier = Atelier::findOrFail($id);

        if ($atelier->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $validated = $request->validate([
            'nom'              => 'sometimes|string|max:150',
            'description'      => 'sometimes|string',
            'domaine'          => 'sometimes|string|max:100',
            'localisation'     => 'sometimes|string|max:255',
            'image_principale' => 'nullable|string',
        ]);

        // Repasse en pending après modification
        $atelier->update([
            'verification_status' => 'pending',
            ...$validated,
        ]);

        return response()->json([
            'message' => 'Atelier mis à jour. En attente d\'approbation admin.',
            'atelier' => $atelier->fresh(),
        ], 200);
    }

    // ── Supprimer son atelier ─────────────────────────────────────────────────
    public function destroy($id)
    {
        $atelier = Atelier::findOrFail($id);

        if ($atelier->user_id !== Auth::id()) {
            return response()->json(['message' => 'Non autorisé'], 403);
        }

        $atelier->delete();

        return response()->json(['message' => 'Atelier supprimé'], 200);
    }
}
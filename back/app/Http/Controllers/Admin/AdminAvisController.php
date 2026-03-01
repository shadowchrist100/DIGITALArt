<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Avis;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminAvisController extends Controller
{
    /**
     * Lister tous les avis avec filtres.
     * GET /api/admin/avis
     * Params: note_min, note_max, atelier_id, par_page
     */
    public function index(Request $request): JsonResponse
    {
        $avis = Avis::with([
            'client:id,nom,prenom,email',
            'atelier:id,nom,domaine',
        ])
        ->when($request->atelier_id, fn($q) => $q->where('atelier_id', $request->atelier_id))
        ->when($request->note_min, fn($q) => $q->where('note', '>=', $request->note_min))
        ->when($request->note_max, fn($q) => $q->where('note', '<=', $request->note_max))
        ->when($request->search, fn($q) => $q->where('commentaire', 'ilike', "%{$request->search}%"))
        ->orderByDesc('created_at')
        ->paginate($request->par_page ?? 20);

        return response()->json($avis);
    }

    /**
     * Supprimer un avis abusif.
     * DELETE /api/admin/avis/{id}
     */
    public function destroy(int $id): JsonResponse
    {
        $avis = Avis::findOrFail($id);
        $avis->delete();

        return response()->json(['message' => 'Avis supprimé.']);
    }
}

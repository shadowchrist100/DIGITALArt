<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\RendezVous;
use App\Models\Service;
use App\Models\ServiceImmediat;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminServiceController extends Controller
{
    /**
     * Lister tous les services.
     * GET /api/admin/services
     * Params: statut, atelier_id, par_page
     */
    public function indexServices(Request $request): JsonResponse
    {
        $services = Service::with([
            'client:id,nom,prenom,email',
            'atelier:id,nom,domaine',
            'offre:id,titre,prix',
        ])
        ->when($request->statut, fn($q) => $q->where('statut', $request->statut))
        ->when($request->atelier_id, fn($q) => $q->where('atelier_id', $request->atelier_id))
        ->orderByDesc('created_at')
        ->paginate($request->par_page ?? 20);

        return response()->json($services);
    }

    /**
     * Lister tous les rendez-vous.
     * GET /api/admin/rendez-vous
     * Params: statut, atelier_id, date_debut, date_fin, par_page
     */
    public function indexRendezVous(Request $request): JsonResponse
    {
        $rdvs = RendezVous::with([
            'client:id,nom,prenom,email',
            'atelier:id,nom,domaine,localisation',
        ])
        ->when($request->statut, fn($q) => $q->where('statut', $request->statut))
        ->when($request->atelier_id, fn($q) => $q->where('atelier_id', $request->atelier_id))
        ->when($request->date_debut, fn($q) => $q->whereDate('date_rdv', '>=', $request->date_debut))
        ->when($request->date_fin, fn($q) => $q->whereDate('date_rdv', '<=', $request->date_fin))
        ->orderByDesc('date_rdv')
        ->paginate($request->par_page ?? 20);

        return response()->json($rdvs);
    }

    /**
     * Lister tous les services immédiats.
     * GET /api/admin/services-immediats
     * Params: statut, domaine, par_page
     */
    public function indexServicesImmediats(Request $request): JsonResponse
    {
        $services = ServiceImmediat::with([
            'client:id,nom,prenom,email',
            'artisanAcceptant.utilisateur:id,nom,prenom,email',
        ])
        ->when($request->statut, fn($q) => $q->where('statut', $request->statut))
        ->when($request->domaine, fn($q) => $q->where('domaine', 'ilike', "%{$request->domaine}%"))
        ->orderByDesc('created_at')
        ->paginate($request->par_page ?? 20);

        return response()->json($services);
    }

    /**
     * Supprimer un service (cas exceptionnel).
     * DELETE /api/admin/services/{id}
     */
    public function destroyService(int $id): JsonResponse
    {
        $service = Service::findOrFail($id);
        $service->delete();

        return response()->json(['message' => 'Service supprimé.']);
    }

    /**
     * Supprimer un rendez-vous (cas exceptionnel).
     * DELETE /api/admin/rendez-vous/{id}
     */
    public function destroyRendezVous(int $id): JsonResponse
    {
        $rdv = RendezVous::findOrFail($id);
        $rdv->delete();

        return response()->json(['message' => 'Rendez-vous supprimé.']);
    }
}

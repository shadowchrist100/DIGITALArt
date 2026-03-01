<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Atelier;
use App\Models\Avis;
use App\Models\RendezVous;
use App\Models\Service;
use App\Models\ServiceImmediat;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class AdminDashboardController extends Controller
{
    /**
     * Tableau de bord — statistiques globales.
     * GET /api/admin/dashboard
     */
    public function index(): JsonResponse
    {
        // ── Utilisateurs ──────────────────────────────────────
        $totalUsers    = User::count();
        $totalClients  = User::where('role', 'CLIENT')->count();
        $totalArtisans = User::where('role', 'ARTISAN')->count();
        $suspendus     = User::where('suspendu', true)->count();

        $nouveauxCeMois = User::whereMonth('created_at', now()->month)
            ->whereYear('created_at', now()->year)
            ->count();

        // ── Ateliers ──────────────────────────────────────────
        $totalAteliers   = Atelier::count();
        $ateliersSuspendus = Atelier::where('suspendu', true)->count();

        // ── Services ──────────────────────────────────────────
        $servicesParStatut = Service::select('statut', DB::raw('count(*) as total'))
            ->groupBy('statut')
            ->pluck('total', 'statut');

        $totalServices = Service::count();

        // ── Rendez-vous ───────────────────────────────────────
        $rdvParStatut = RendezVous::select('statut', DB::raw('count(*) as total'))
            ->groupBy('statut')
            ->pluck('total', 'statut');

        $totalRdv = RendezVous::count();

        // ── Services immédiats ────────────────────────────────
        $siParStatut = ServiceImmediat::select('statut', DB::raw('count(*) as total'))
            ->groupBy('statut')
            ->pluck('total', 'statut');

        // ── Avis ──────────────────────────────────────────────
        $totalAvis    = Avis::count();
        $noteMoyenne  = round(Avis::avg('note') ?? 0, 1);

        $avisParNote = Avis::select('note', DB::raw('count(*) as total'))
            ->groupBy('note')
            ->orderBy('note')
            ->pluck('total', 'note');

        // ── Activité récente (7 derniers jours) ───────────────
        $activiteRecente = [
            'nouveaux_utilisateurs' => User::where('created_at', '>=', now()->subDays(7))->count(),
            'nouveaux_services'     => Service::where('created_at', '>=', now()->subDays(7))->count(),
            'nouveaux_rdv'          => RendezVous::where('created_at', '>=', now()->subDays(7))->count(),
            'nouveaux_avis'         => Avis::where('created_at', '>=', now()->subDays(7))->count(),
        ];

        // ── Top 5 ateliers par note ───────────────────────────
        $topAteliers = Atelier::with('artisan.utilisateur:id,nom,prenom')
        ->select([
            'ateliers.id',
            'ateliers.nom',
            'ateliers.domaine',
            'ateliers.localisation',
            DB::raw('(SELECT AVG(note) FROM avis WHERE avis.atelier_id = ateliers.id) as note_moyenne'),
            DB::raw('(SELECT COUNT(*) FROM avis WHERE avis.atelier_id = ateliers.id) as total_avis'),
        ])
        ->whereRaw('(SELECT COUNT(*) FROM avis WHERE avis.atelier_id = ateliers.id) > 0')
        ->orderByRaw('(SELECT AVG(note) FROM avis WHERE avis.atelier_id = ateliers.id) DESC NULLS LAST')
        ->limit(5)
        ->get();

        // ── Domaines les plus actifs ──────────────────────────
        $domainesActifs = Atelier::select('domaine', DB::raw('count(*) as total_ateliers'))
            ->groupBy('domaine')
            ->orderByDesc('total_ateliers')
            ->limit(5)
            ->get();

        return response()->json([
            'utilisateurs' => [
                'total'          => $totalUsers,
                'clients'        => $totalClients,
                'artisans'       => $totalArtisans,
                'suspendus'      => $suspendus,
                'nouveaux_mois'  => $nouveauxCeMois,
            ],
            'ateliers' => [
                'total'     => $totalAteliers,
                'suspendus' => $ateliersSuspendus,
            ],
            'services' => [
                'total'      => $totalServices,
                'par_statut' => $servicesParStatut,
            ],
            'rendez_vous' => [
                'total'      => $totalRdv,
                'par_statut' => $rdvParStatut,
            ],
            'services_immediats' => [
                'par_statut' => $siParStatut,
            ],
            'avis' => [
                'total'        => $totalAvis,
                'note_moyenne' => $noteMoyenne,
                'par_note'     => $avisParNote,
            ],
            'activite_7_jours' => $activiteRecente,
            'top_ateliers'     => $topAteliers,
            'domaines_actifs'  => $domainesActifs,
        ]);
    }

    /**
     * Évolution des inscriptions par mois (12 derniers mois).
     * GET /api/admin/dashboard/inscriptions
     */
    public function inscriptions(): JsonResponse
    {
        $data = User::select(
                DB::raw("TO_CHAR(created_at, 'YYYY-MM') as mois"),
                DB::raw('count(*) as total'),
                'role'
            )
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('mois', 'role')
            ->orderBy('mois')
            ->get();

        return response()->json(['inscriptions' => $data]);
    }

    /**
     * Évolution des services par mois (12 derniers mois).
     * GET /api/admin/dashboard/services-evolution
     */
    public function servicesEvolution(): JsonResponse
    {
        $data = Service::select(
                DB::raw("TO_CHAR(created_at, 'YYYY-MM') as mois"),
                DB::raw('count(*) as total'),
                'statut'
            )
            ->where('created_at', '>=', now()->subMonths(12))
            ->groupBy('mois', 'statut')
            ->orderBy('mois')
            ->get();

        return response()->json(['evolution' => $data]);
    }
}

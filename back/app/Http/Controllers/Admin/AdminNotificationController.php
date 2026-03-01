<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\NotificationService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AdminNotificationController extends Controller
{
    public function __construct(private NotificationService $notifService) {}

    /**
     * Envoyer une notification à un utilisateur spécifique.
     * POST /api/admin/notifications/envoyer
     */
    public function envoyer(Request $request): JsonResponse
    {
        $data = $request->validate([
            'destinataire_id' => ['required', 'integer', 'exists:users,id'],
            'message'         => ['required', 'string', 'max:500'],
            'type'            => ['nullable', 'string', 'max:50'],
        ]);

        $notif = $this->notifService->envoyer(
            $data['destinataire_id'],
            $data['type'] ?? 'INFO',
            $data['message'],
        );

        $destinataire = User::find($data['destinataire_id']);

        return response()->json([
            'message'      => "Notification envoyée à {$destinataire->prenom} {$destinataire->nom}.",
            'notification' => $notif,
        ], 201);
    }

    /**
     * Envoyer une notification à tous les utilisateurs (broadcast).
     * POST /api/admin/notifications/broadcast
     */
    public function broadcast(Request $request): JsonResponse
    {
        $data = $request->validate([
            'message' => ['required', 'string', 'max:500'],
            'role'    => ['nullable', 'in:CLIENT,ARTISAN,ADMIN'],
            'type'    => ['nullable', 'string', 'max:50', 'in:INFO,SYSTEME'],
        ]);

        $query = User::query();

        if ($data['role'] ?? null) {
            $query->where('role', $data['role']);
        }

        $users = $query->get(['id']);
        $count = 0;

        foreach ($users as $user) {
            $this->notifService->envoyer(
                $user->id,
                $data['type'] ?? 'INFO',
                $data['message'],
            );
            $count++;
        }

        return response()->json([
            'message' => "{$count} notification(s) envoyée(s).",
            'total'   => $count,
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotificationController extends Controller
{
    /**
     * GET /api/notifications
     * Liste toutes les notifications de l'utilisateur connecté
     */
    public function index(Request $request)
    {
        $query = Notification::where('user_id', Auth::id())
            ->orderByDesc('created_at');

        // Filtre par statut de lecture
        if ($request->has('filter')) {
            if ($request->filter === 'unread') {
                $query->where('read', false);
            } elseif ($request->filter === 'read') {
                $query->where('read', true);
            }
        }

        $notifications = $query->get()->map(function ($notif) {
            return [
                'id'      => $notif->id,
                'type'    => $notif->type,
                'title'   => $notif->title,
                'message' => $notif->message,
                'link'    => $notif->link,
                'read'    => $notif->read,
                'time'    => $this->formatTime($notif->created_at),
            ];
        });

        $unreadCount = Notification::where('user_id', Auth::id())
            ->where('read', false)
            ->count();

        return response()->json([
            'notifications' => $notifications,
            'unread_count'  => $unreadCount,
        ], 200);
    }

    /**
     * PUT /api/notifications/{id}/read
     * Marquer une notification comme lue
     */
    public function markAsRead($id)
    {
        $notification = Notification::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $notification->update(['read' => true]);

        return response()->json([
            'message' => 'Notification marquée comme lue',
        ], 200);
    }

    /**
     * PUT /api/notifications/read-all
     * Marquer toutes les notifications comme lues
     */
    public function markAllAsRead()
    {
        Notification::where('user_id', Auth::id())
            ->where('read', false)
            ->update(['read' => true]);

        return response()->json([
            'message' => 'Toutes les notifications ont été marquées comme lues',
        ], 200);
    }

    /**
     * DELETE /api/notifications/{id}
     * Supprimer une notification
     */
    public function destroy($id)
    {
        $notification = Notification::where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $notification->delete();

        return response()->json([
            'message' => 'Notification supprimée',
        ], 200);
    }

    /**
     * Formater le temps relatif
     */
    private function formatTime($date)
    {
        $diff = now()->diffInMinutes($date);

        if ($diff < 60) {
            return "Il y a {$diff} minute" . ($diff > 1 ? 's' : '');
        }

        $hours = floor($diff / 60);
        if ($hours < 24) {
            return "Il y a {$hours} heure" . ($hours > 1 ? 's' : '');
        }

        $days = floor($hours / 24);
        if ($days < 7) {
            return "Il y a {$days} jour" . ($days > 1 ? 's' : '');
        }

        return $date->format('d M Y');
    }
}
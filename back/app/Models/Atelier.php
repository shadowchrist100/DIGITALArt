<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Atelier extends Model
{
    use HasFactory;

    protected $table = 'atelier';

    protected $fillable = [
        'user_id',          // ← corrigé (la migration utilise user_id)
        'nom',
        'description',
        'image_principale',
        'localisation',
        'domaine',
        'verification_status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    // ── Relations ─────────────────────────────────────────────────────────────

    /** L'atelier appartient à un User (artisan) */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /** Un atelier a plusieurs offres */
    public function offres()
    {
        return $this->hasMany(Offre::class);
    }

    /** Un atelier a plusieurs avis */
    public function avis()
    {
        return $this->hasMany(Avis::class);
    }
}
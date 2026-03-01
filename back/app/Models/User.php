<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'nom',
        'prenom',
        'email',
        'password',
        'role',
        'photo_profil',
        'bio',
        'specialite',
        'experience_level',
        'verification_status',
        'verification_documents',
        'verified_at',
    ];

    protected $hidden = [
        'password',
    ];

    protected function casts(): array
    {
        return [
            'password'   => 'hashed',
            'verified_at'=> 'datetime',
        ];
    }

    // ── JWT ───────────────────────────────────────────────────────────────────
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    // ── Relations ─────────────────────────────────────────────────────────────

    /** Profil artisan (téléphone, etc.) */
    public function artisan()
    {
        return $this->hasOne(Artisan::class);
    }

    /** Avis reçus (quand l'utilisateur est artisan) */
    public function avisRecus()
    {
        return $this->hasMany(Avis::class, 'artisan_id');
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    public function isArtisan(): bool
    {
        return $this->role === 'ARTISAN';
    }

    public function isClient(): bool
    {
        return $this->role === 'CLIENT';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'ADMIN';
    }

    /** Note moyenne calculée depuis les avis */
    public function getRatingAttribute(): ?float
    {
        if ($this->relationLoaded('avisRecus') && $this->avisRecus->isNotEmpty()) {
            return round($this->avisRecus->avg('note'), 1);
        }
        return null;
    }
}
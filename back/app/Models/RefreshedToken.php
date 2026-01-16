<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RefreshedToken extends Model
{
    //
    protected $fillable = [
        'refresh_token_hash',
        'user_id',
        'expire_at',
    ];

    public function user (): BelongsTo{
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class RefreshedToken extends Model
{
    //
    protected $fillable=[
        'user_id',
        'refresh_token_hash',
        'revoke'
    ]
}

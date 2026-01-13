<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Models\RefreshedToken;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;


class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->validate([
            'email' => ['required', 'email', 'max:50'],
            'password' => ['required', Password::min(8)]
        ]);
        if (! $token = auth('api')->attempt($credentials)) {
            return response()->json(['error'=> 'Unauthorized'], 401);
        }
        $user = User::where('email',$credentials['email'])->first();
        // return $this->respond_with_token($token,$user);
        // $credentials = $request->only('email', 'password');
        // $credentials
        // $token =$user = [];

        // connecté l'utilisateur, lui générer un accestoken 

        return $this->respond_with_token($token, $user);
    }

    public function register(Request $request){
        $credentials = $request->validate([
            'nom' => ['required', 'max:50'],
            'prenom' => ['required', 'max:50'],
            'email' => ['required', 'email' , 'unique:users', 'max:50'],
            'password' => ['required', 'confirmed', Password::min(8)],
            'role' => ['required'],
            'photo_profil' => ['mimes:jpg,jpeg,svg,png']
        ]);
    
        $user = User::create($credentials);
        $token = auth('api')->login($user);

        // céer l'utilisateur lui générer un accesToken

        return $this->respond_with_token($token, $user);
    }

    public function logout(){

    }

    public function refresh(){
        // rafraishir l'accessToken
    }

    protected function respond_with_token($token, $user){
        $refresh_token = bin2hex(random_bytes(64));
        $refresh_token_hash = hash('sha256',$refresh_token);
        RefreshedToken::create([
            'user_id' => $user->id,
            'refresh_token_hash' => $refresh_token_hash,
            'expire_at' => now()->addDay(30)
        ]);
        $cookie = cookie('refresh_token', $refresh_token, 60 *24*30, '/', null, false, true, false, null );
        return response()->json([
            'access_token' => $token,
            'token_type' => 'Bearer',
            'expires_in' => auth('api')->factory()->getTTL() * 60,
            'user_data' => $user
        ])->withCookie($cookie);

        // récupérer l'accesToken et l'utilisateur 
        // générer un refreshToken 
        // retourner l'utilisateur, l'accesToken 
        // retourner le refreshToken dans les cookies 
    }
}

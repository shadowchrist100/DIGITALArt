<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request){
        $credentials = $request->only('email', 'password');
        $token =$user = [];

        // connecté l'utilisateur, lui générer un accestoken 

        return $this->respond_with_token($token, $user);
    }

    public function register(Request $request){
        $token =$user = [];

        // céer l'utilisateur lui générer un accesToken

        return $this->respond_with_token($token, $user);
    }

    public function logout(){

    }

    public function refresh(){
        // rafraishir l'accessToken
    }

    protected function respond_with_token($token, $user){
        // récupérer l'accesToken et l'utilisateur 
        // générer un refreshToken 
        // retourner l'utilisateur, l'accesToken 
        // retourner le refreshToken dans les cookies 
    }
}

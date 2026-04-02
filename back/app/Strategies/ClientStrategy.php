<?php
    namespace App\Strategies;
    use App\Models\User;
    use App\Strategies\UserRegistration;

    class ClientStrategy implements UserRegistration {
        public function create(User $user, array $data){
            $user->client()->create([]);
        }
    }

<?php
    namespace App\Strategies;
    use App\Models\User;
    use App\Strategies\UserRegistration;

    class ArtisanStrategy implements UserRegistration {
        public function create(User $user, array $data){
            $user->artisan()->create(array_intersect_key($data, array_flip(['telephone','domaine','specialite'])));
        }
    }

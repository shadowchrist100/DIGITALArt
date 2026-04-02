<?php
    namespace App\Factories;
    use App\Strategies\ArtisanStrategy;
    use App\Strategies\ClientStrategy;
    use App\Strategies\UserRegistration;

    class RegistrationFactory{
        public function getStrategy(string $role):UserRegistration {
            return match ($role) {
                "ARTISAN" => new ArtisanStrategy() ,
                "CLIENT" => new ClientStrategy(),
                default => throw new Exception("Unknowkn role", 1)
            };
        }
    }


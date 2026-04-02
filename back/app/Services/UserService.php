<?php
    namespace App\Services;
    use App\Models\User;
    use Illuminate\Support\Facades\Hash;
    use App\Factories\RegistrationFactory;

    class UserService{
        private $factory ;
        public function __construct(RegistrationFactory $factory){
            $this->factory = $factory;
        }
        public function register(array $data):User{
            $user = \DB::transaction(function () use ($data) {
                $user = User::create([
                'nom'          => $data['nom'],
                'prenom'       => $data['prenom'],
                'email'        => $data['email'],
                'password' => Hash::make($data['password']),
                'role'         => $data['role']
                ]);
                $strategy = $this->factory->getStrategy($data['role']);
                $strategy->create($user,$data);
                return $user;
            });
            return $user;
        }
    }
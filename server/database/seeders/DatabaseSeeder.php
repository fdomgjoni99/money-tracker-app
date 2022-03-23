<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory(1)
            ->has(Category::factory(6))
            ->has(
                Transaction::factory(100)
                                ->state(function(array $attributes, User $user){
                                    return [
                                        'category_id' => rand(1, 6),
                                        'created_at' => Carbon::today()->subDays(rand(0, 365))
                                    ];
                                })
            )
            ->create([
                'email' => 'admin@gmail.com',
                'password' => Hash::make('password')
            ]);
    }
}

<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Hash;
use Tests\TestCase;

class AuthTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic test example.
     *
     * @return void
     */
    public function test_user_can_be_registered()
    {
        $user = User::factory()->make();
        $response = $this->json('post', '/api/auth/register', [
            'name' => $user->name,
            'email' => $user->email,
            'password' => 'password',
        ]);
        $response->assertStatus(201);
        $this->assertDatabaseHas('users', [
            'id' => 1,
            'name' => $user->name
        ]);
        $this->assertDatabaseCount('balances', 1);
    }

    public function test_user_can_login(){
        $user = User::factory()->create([
            'password' => Hash::make('password')
        ]);
        $data = [
            'device_name' => $user->name . "'s phone",
            'email' => $user->email,
            'password' => 'password',
        ];
        $response = $this->json('post', '/api/auth/login', $data);
        $response->assertOk()
                ->assertJsonStructure(['token']);
        $this->assertDatabaseCount('personal_access_tokens', 1);
    }

    public function test_guest_user_can_be_registered()
    {
        $response = $this->json('post', '/api/auth/guest/register', []);
        $response->assertStatus(201);
        $response->assertJsonStructure(['id', 'guest_token']);
        $this->assertDatabaseHas('users', [
            'id' => 1,
        ]);
        $this->assertDatabaseCount('balances', 1);
    }
}

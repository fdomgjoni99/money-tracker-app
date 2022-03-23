<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_user_can_create_category()
    {
        Sanctum::actingAs(User::factory()->create());
        $data = [
            'name' => 'food',
            'icon' => 'burger.png',
            'color' => '#444444'
        ];
        $response = $this->json('post', '/api/categories', $data);
        $response->assertCreated();
        $this->assertDatabaseHas('categories', $data);
    }

    public function test_user_can_delete_category(){
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $category = Category::factory()->for($user)->create();
        $response = $this->json('delete', '/api/categories/' . $category->id);
        $response->assertOk();
        $this->assertModelMissing($category);
    }

    public function test_user_can_update_category(){
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $category = Category::factory()->for($user)->create();
        $data = [
            'name' => 'clothes',
            'icon' => 'clothes.png',
            'color' => '#444444'
        ];
        $response = $this->json('put', '/api/categories/' . $category->id, $data);
        $response->assertOk();
        $this->assertDatabaseHas('categories', $data);
    }

    public function test_user_can_get_categories(){
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        Category::factory()->count(3)->for($user)->create();
        $response = $this->json('get', '/api/categories');
        $response->assertOk()
                    ->assertJsonStructure(['per_page', 'data', 'from', 'to', 'current_page', 'next_page_url', 'prev_page_url', 'path'])
                    ->assertJsonCount(3, 'data');
    }
}

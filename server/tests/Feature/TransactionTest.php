<?php

namespace Tests\Feature;

use App\Models\Category;
use App\Models\RecurringTransaction;
use App\Models\Transaction;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class TransactionTest extends TestCase
{
    use RefreshDatabase;

    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_user_can_create_transaction()
    {
        $user = User::factory()->create();
        $category = Category::factory()->for($user)->create();
        Sanctum::actingAs($user);
        $data = [
            'amount' => 200,
            'description' => 'Gift for Mother\'s day',
            'type' => 'expense',
            'category_id' => $category->id
        ];
        $response = $this->json('post', '/api/transactions', $data);
        $response->assertStatus(201);
        $this->assertDatabaseHas('transactions', $data);
    }

    public function test_user_can_delete_transaction()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $transaction = Transaction::factory()->for($user)->create([
            'category_id' => 1
        ]);
        $response = $this->json('delete', '/api/transactions/' . $transaction->id);
        $response->assertOk();
        $this->assertModelMissing($transaction);
    }

    public function test_user_can_update_transaction()
    {
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $category = Category::factory()->for($user)->create();
        $transaction = Transaction::factory()->for($user)->create([
            'category_id' => 1
        ]);
        $data = [
            'amount' => '700',
            'description' => 'Clothes for kids',
            'type' => 'expense',
            'category_id' => $category->id
        ];
        $response = $this->json('put', '/api/transactions/' . $transaction->id, $data);
        $response->assertOk();
        $this->assertDatabaseHas('transactions', $data);
    }

    public function test_user_can_get_transactions()
    {
        User::factory(1)
            ->has(Category::factory(3))
            ->has(
                Transaction::factory(3)
                    ->state(function (array $attributes, User $user) {
                        return [
                            'category_id' => rand(1, 3)
                        ];
                    })
            )->create();
        $user = User::first();
        Sanctum::actingAs($user);
        $response = $this->json('get', '/api/transactions');
        $response->assertOk()
            ->assertJsonCount(3, 'data')
            ->assertJsonStructure(['data' => [
                '*' => ['amount', 'description', 'type', 'category' => [
                    'name', 'icon', 'color'
                ]],
            ], 'per_page', 'from', 'to', 'current_page', 'next_page_url', 'prev_page_url', 'path']);
    }

    // TODO: fix this test
    public function test_user_can_get_transaction_statistics()
    {
        User::factory(1)
            ->has(Category::factory(3))
            ->has(
                Transaction::factory(3)
                    ->state(function (array $attributes, User $user) {
                        return [
                            'category_id' => rand(1, 3)
                        ];
                    })
            )->create();
        $user = User::first();
        Sanctum::actingAs($user);
        $response = $this->json('get', '/api/transactions/statistics');
        $response->assertOk()
            ->assertJsonCount(3, 'data');
        // ->assertJsonStructure(['data' => [
        //     '*' => ['amount', 'description', 'type', 'category' => [
        //         'name', 'icon', 'color'
        //     ]],
        // ],'per_page', 'from', 'to', 'current_page', 'next_page_url', 'prev_page_url', 'path']);
    }

    public function test_user_can_create_recurring_transaction()
    {
        $user = User::factory()->create();
        $category = Category::factory()->for($user)->create();
        Sanctum::actingAs($user);
        $data = [
            'amount' => 200,
            'description' => 'Netflix subscription',
            'type' => 'expense',
            'category_id' => $category->id,
            'run_on' => '11 March'
        ];
        $response = $this->json('post', '/api/recurring-transactions', $data);
        $response->assertStatus(201);
        $this->assertDatabaseHas('recurring_transactions', $data);
    }

    public function test_transactions_are_created_automatically_by_task_scheduler(){
        $recurringTransaction = RecurringTransaction::make([
            'amount' => 300,
            'description' => 'Netflix subscription',
            'type' => 'expense',
            'category_id' => 0,
            'run_on' => '12',
        ]);
        $recurringTransaction->user_id = 0;
        $recurringTransaction->save();
        if(is_numeric($recurringTransaction->run_on))
            $time = Carbon::now()->setDays($recurringTransaction->run_on);
        else
            $time = Carbon::parse($recurringTransaction->run_on);
        $this->travelTo($time);
        $this->artisan('schedule:run');
        $this->assertDatabaseHas('transactions', [
            'amount' => 300,
            'description' => 'Netflix subscription',
            'type' => 'expense',
            'category_id' => 0
        ]);
    }
}

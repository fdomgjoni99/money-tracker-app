<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'amount' => $this->faker->numberBetween(1, 200),
            'description' => $this->faker->sentence(),
            'type' => $this->faker->randomElement(['income', 'expense']),
        ];
    }
}

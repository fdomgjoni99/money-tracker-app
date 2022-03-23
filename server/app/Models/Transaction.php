<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

	// change sum to amount
    protected $fillable = [
        'amount', 'description', 'type', 'category_id'
    ];

    public static function booted(){
        static::created(function($transaction){
            $balance = Balance::find($transaction->user_id);
            if($transaction->type === 'income'){
                $balance->income += $transaction->amount;
                $balance->total += $transaction->amount;
            }else{
                $balance->expense += $transaction->amount;
                $balance->total -= $transaction->amount;
            }
            $balance->save();
        });

        static::deleted(function($transaction){
            $balance = Balance::find($transaction->user_id);
            $expense = Transaction::where('type', 'expense')->sum('amount');
            $income = Transaction::where('type', 'income')->sum('amount');
            $amount = $income - $expense;
            $balance->total = $amount;
            $balance->income = $income;
            $balance->expense = $expense;
            $balance->save();
        });

        static::updated(function($transaction){
            $balance = Balance::find($transaction->user_id);
            $expense = Transaction::where('type', 'expense')->sum('amount');
            $income = Transaction::where('type', 'income')->sum('amount');
            $amount = $income - $expense;
            $balance->total = $amount;
            $balance->income = $income;
            $balance->expense = $expense;
            $balance->save();
        });
    }

    public function user(){
        return $this->belongsTo(User::class);
    }

    public function category(){
        return $this->belongsTo(Category::class);
    }

    public function recurring(){
        return $this->belongsTo(RecurringTransaction::class);
    }
}

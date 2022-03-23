<?php
namespace App\Services;

use App\Models\RecurringTransaction;
use App\Models\Transaction;
use Carbon\Carbon;

class TransactionService{
  // day: today
  // week: monday
  // month: 11
  public static function handleRecurringTransactions(){
    // RecurringTransaction::chunkById(200, function($recurringTransactions){
      foreach(RecurringTransaction::lazyById(200) as $recurringTransaction){
        $condition = null;
        if(is_numeric($recurringTransaction->run_on))
          $condition = Carbon::now()->setDays((int)$recurringTransaction->run_on)->isSameDay(Carbon::now());
        else
          $condition = Carbon::now()->isSameDay($recurringTransaction->run_on);
        if($condition){
          $transaction = new Transaction;
          $transaction->amount = $recurringTransaction->amount;
          $transaction->description = $recurringTransaction->description;
          $transaction->type = $recurringTransaction->type;
          $transaction->category_id = $recurringTransaction->category_id;
          $transaction->user_id = $recurringTransaction->user_id;
          $recurringTransaction->transaction()->save($transaction);
        }
      }
    // });
  }
}
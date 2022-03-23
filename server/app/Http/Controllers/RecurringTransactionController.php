<?php

namespace App\Http\Controllers;

use App\Models\RecurringTransaction;
use Illuminate\Http\Request;

class RecurringTransactionController extends Controller
{
    public function store(Request $request){
        $data = $request->validate([
            'amount' => 'required|integer|between:1,100000',
            'description' => 'nullable|max:250',
            'type' => 'required|in:income,expense',
            'category_id' => 'required|integer|exists:categories,id',
            'run_on' => 'required',
        ]);
        $recurringTransaction = RecurringTransaction::make($data);
        $recurringTransaction->user_id = $request->user()->id;
        $recurringTransaction->save();
        return $recurringTransaction;
    }

    public function destroy(RecurringTransaction $recurringTransaction)
    {
        $recurringTransaction->delete();
        return $recurringTransaction;
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RecurringTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount', 'description', 'type', 'category_id', 'run_on'
    ];
    
    public function transaction(){
        return $this->hasOne(Transaction::class);
    }
}

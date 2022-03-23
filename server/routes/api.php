<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\RecurringTransactionController;
use App\Http\Controllers\TransactionController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// TODO: add boards or a similar concept in order to allow multiple users to share transactions
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
// Route::group(['middleware' => 'only_accept_json_content'], function(){
    Route::group(['prefix' => 'auth'], function(){
        Route::post('register', [AuthController::class, 'register']);
        Route::post('guest/register', [AuthController::class, 'registerGuest']);
        Route::post('login', [AuthController::class, 'login']);
    });
    
    Route::middleware('auth:sanctum')->group(function(){
        Route::apiResource('categories', CategoryController::class);
        Route::get('transactions/statistics', [TransactionController::class, 'getStatistics']);
        Route::get('transactions/date/{date}', [TransactionController::class, 'getByDate']);
        Route::apiResource('recurring-transactions', RecurringTransactionController::class);
        Route::apiResource('transactions', TransactionController::class);
    });
    
    Route::group(['prefix' => 'guest', 'middleware' => ['user.is_guest']], function(){
        Route::apiResource('categories', CategoryController::class);
        Route::get('transactions/statistics', [TransactionController::class, 'getStatistics']);
        Route::get('transactions/date/{date}', [TransactionController::class, 'getByDate']);
        Route::apiResource('recurring-transactions', RecurringTransactionController::class);
        Route::apiResource('transactions', TransactionController::class);
    });
// });
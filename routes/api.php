<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\PlayerController;


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

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::middleware(['throttle:seventy'])->group(function() {
    
    Route::apiResource('/players', PlayerController::class)->only(['index', 'show']);

    Route::group(['prefix' => 'player'], function () {
        Route::get('/info', 'App\Http\Controllers\Api\InfoController@info');
        Route::post('/info/store', 'App\Http\Controllers\Api\InfoController@store');
    
        Route::get('/goal/detail/{id}', 'App\Http\Controllers\Api\GoalManageController@detail');
        Route::get('/goal/last', 'App\Http\Controllers\Api\GoalManageController@last');
        Route::get('/goal/list', 'App\Http\Controllers\Api\GoalManageController@list');
        Route::post('/goal/store', 'App\Http\Controllers\Api\GoalManageController@store');
        Route::post('/goal/update/{id}', 'App\Http\Controllers\Api\GoalManageController@update');
        Route::delete('/goal/delete/{id}', 'App\Http\Controllers\Api\GoalManageController@delete');
    
        Route::get('/match/detail/{id}', 'App\Http\Controllers\Api\MatchController@detail');
        Route::get('/match/list', 'App\Http\Controllers\Api\MatchController@list');
        Route::post('/match/prepare/store', 'App\Http\Controllers\Api\MatchController@prepare_store');
        Route::post('/match/prepare/update/{id}', 'App\Http\Controllers\Api\MatchController@prepare_update');
        Route::post('/match/result/store', 'App\Http\Controllers\Api\MatchController@result_store');
        Route::post('/match/result/update/{id}', 'App\Http\Controllers\Api\MatchController@result_update');
        Route::delete('/match/delete/{id}', 'App\Http\Controllers\Api\MatchController@delete');
        
        Route::get('/analysis/list', 'App\Http\Controllers\Api\MatchController@analysis');
    });
    
    
});
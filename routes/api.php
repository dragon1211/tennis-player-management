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
    
    Route::get('/player/info', 'App\Http\Controllers\Api\InfoController@info');
    Route::post('/player/info/store', 'App\Http\Controllers\Api\InfoController@store');


    Route::get('/player/goal/detail/{id}', 'App\Http\Controllers\Api\GoalManageController@detail');
    Route::get('/player/goal/last', 'App\Http\Controllers\Api\GoalManageController@last');
    Route::get('/player/goal/list', 'App\Http\Controllers\Api\GoalManageController@list');
    Route::post('/player/goal/store', 'App\Http\Controllers\Api\GoalManageController@store');
    Route::post('/player/goal/update/{id}', 'App\Http\Controllers\Api\GoalManageController@update');


    Route::get('player/match', 'App\Http\Controllers\Api\MatchController@match');
    
});
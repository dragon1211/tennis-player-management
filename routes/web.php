<?php

use Illuminate\Support\Facades\Route;


/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () { return view('home');  })->name('home');

Auth::routes();



Route::middleware(['auth:users'])->group(function () {

    Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

    // Route::get('/dashboard/player/{id}', [DashboardController::class, 'show'])->name('dashboard.player.show');
    
    // Route::get('/api/msgs', [NoticeController::class, 'index'])->name('msgs.get');
    // Route::put('/api/msgs/read/{id}', [NoticeController::class, 'read'])->name('message.read');
    // Route::post('/api/msgs/reply/{id}', [NoticeController::class, 'saveReplyMsg'])->name('message.reply');
    // Route::get('/api/players', [PlayerController::class, 'index'])->name('players.get');
    

    Route::group(['prefix'=>'player'], function(){

        Route::get('/profile/edit', [App\Http\Controllers\Front\Player\ProfileController::class, 'edit'])->name('player.profile.edit');
        Route::post('/profile/store', [App\Http\Controllers\Front\Player\ProfileController::class, 'store'])->name('player.profile.store');
    
        Route::get('/info', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        Route::get('/info/edit', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
    
        Route::get('/goal', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        Route::get('/goal/new', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        Route::get('/goal/edit/{id}', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        Route::get('/goal/detail/{id}', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        
        Route::get('/match', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        Route::get('/match/detail/{id}', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        Route::get('/match/prepare/new', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        Route::get('/match/prepare/edit/{id}', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        Route::get('/match/result/new/{id}', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        Route::get('/match/result/edit/{id}', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        
        Route::get('/favourite', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);
        Route::get('favourite/store', [App\Http\Controllers\Front\Player\DashboardController::class, 'index']);

    });


//---------------------------------------------------------------------------------------------------------------------
    Route::group(['prefix'=>'parent'], function(){
    
        Route::get('/dashboard', [App\Http\Controllers\Front\Father\DashboardController::class, 'index']);
        Route::get('/profile/edit', [App\Http\Controllers\Front\Father\ProfileController::class, 'edit']);
        Route::post('/profile/store', [App\Http\Controllers\Front\Father\ProfileController::class, 'store']);
        
    });
});






Route::group(['prefix' => 'admin'], function () {

    Route::get('/login',                               '\App\Http\Controllers\Api\AdminController@checkLogin')->name('adminslogin');
    Route::get('/logout',                              '\App\Http\Controllers\Api\AdminController@logout');

    Route::group(['middleware' => 'auth:admins'], function () {
        Route::get('/player/list', function () { return view('admin.index');  });
    });
});






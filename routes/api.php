<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\FormController;
use App\Http\Controllers\InventController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MenuController;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    // return $request->user();
// });

Route::resource("forms",FormController::class);
Route::resource("invents",InventController::class);
Route::get("cols",[InventController::class,"getColumnData"]);

Route::post("regis",[AuthController::class,"regis"]);
Route::post("login",[AuthController::class,"login"]);



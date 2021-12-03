<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function() {
    Route::post('/register', 'App\Http\Controllers\AuthController@register');
    Route::post('/login', 'App\Http\Controllers\AuthController@login');
    Route::post('/logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('/reset_password', 'App\Http\Controllers\AuthController@reset_password');
    Route::post('/reset_password/{token}', 'App\Http\Controllers\AuthController@confirmation_token');
});
Route::prefix('events')->group(function() {
    Route::get('/show_all', 'App\Http\Controllers\EventsController@index');
    Route::get('/show/{id}', 'App\Http\Controllers\EventsController@show');
    Route::post('/create', 'App\Http\Controllers\EventsController@store');
    Route::post('/update/{event_id}', 'App\Http\Controllers\EventsController@update');
    Route::delete('/delete/{event_id}', 'App\Http\Controllers\EventsController@destroy');
});
Route::prefix('subs')->group(function() {
    Route::post('/subscribe/event/{event_id}', 'App\Http\Controllers\SubscriptionsController@subscribeToEvent');
    Route::post('/subscribe/organizer/{event_id}', 'App\Http\Controllers\SubscriptionsController@subscribeToOrganizer');
    Route::get('/users/{event_id}', 'App\Http\Controllers\SubscriptionsController@showSubscribedUsers');
    Route::get('/organizer/{event_id}', 'App\Http\Controllers\SubscriptionsController@showOrganizerEvents');
    Route::get('/my', 'App\Http\Controllers\SubscriptionsController@showMySubs');
});
Route::prefix('comments')->group(function() {
    Route::get('/show_all', 'App\Http\Controllers\CommentsController@index');
    Route::get('/show/{id}', 'App\Http\Controllers\CommentsController@show');
    Route::get('/event/{event_id}', 'App\Http\Controllers\CommentsController@showAllForEvent');
    Route::post('/create/{event_id}', 'App\Http\Controllers\CommentsController@store');
    Route::post('/update/{id}', 'App\Http\Controllers\CommentsController@update');
    Route::delete('/delete/{id}', 'App\Http\Controllers\CommentsController@destroy');
});
Route::prefix('users')->group(function() {
    Route::get('/show_all', 'App\Http\Controllers\UsersController@index');
    Route::get('/show/{id}', 'App\Http\Controllers\UsersController@show');
    Route::post('/update/{id}', 'App\Http\Controllers\UsersController@update');
    Route::delete('/delete/{id}', 'App\Http\Controllers\UsersController@destroy');
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', 'App\Http\Controllers\AuthController@register'); // Registration
    Route::post('/login', 'App\Http\Controllers\AuthController@login'); // Login
    Route::post('/logout', 'App\Http\Controllers\AuthController@logout'); // Logout
    Route::post('/reset_password', 'App\Http\Controllers\AuthController@reset_password'); // Send reset password email
    Route::post('/reset_password/{token}', 'App\Http\Controllers\AuthController@confirmation_token'); // Confirm reset with token from email
});
Route::prefix('events')->group(function () {
    Route::get('/show_all', 'App\Http\Controllers\EventsController@index'); // Show all events
    Route::get('/show/{id}', 'App\Http\Controllers\EventsController@show'); // Show event by its id
    Route::post('/create', 'App\Http\Controllers\EventsController@store'); // Create new event
    Route::patch('/update/{event_id}', 'App\Http\Controllers\EventsController@update'); // Update event by its id
    Route::post('/delete/{event_id}', 'App\Http\Controllers\EventsController@destroy'); // Delete event by its id
});
Route::prefix('subs')->group(function () {
    Route::post('/subscribe/event/{event_id}', 'App\Http\Controllers\SubscriptionsController@subscribeToEvent'); // Subscribe to event by event id
    Route::post('/subscribe/organizer/{event_id}', 'App\Http\Controllers\SubscriptionsController@subscribeToOrganizer'); // Subscribe to organizer by event id
    Route::get('/users/{event_id}', 'App\Http\Controllers\SubscriptionsController@showSubscribedUsers'); // Show all subscribed users to event using event id
    Route::get('/organizer/{event_id}', 'App\Http\Controllers\SubscriptionsController@showOrganizerEvents'); // Show all organizers event by event id
    Route::post('/organizers/show', 'App\Http\Controllers\SubscriptionsController@showMyOrganizerSubs'); // Show organizers user subscribed on
    Route::post('/my', 'App\Http\Controllers\SubscriptionsController@showMySubs'); // Show user subs using his token
    Route::post('/delete/{event_id}', 'App\Http\Controllers\SubscriptionsController@unsubscribeFromEvent'); // Delete subscription by event id
    Route::post('/delete/org/{organizer_id}', 'App\Http\Controllers\SubscriptionsController@unsubscribeFromOrganizer'); // Delete organizer subscription by organizer id
});
Route::prefix('comments')->group(function () {
    Route::get('/show_all', 'App\Http\Controllers\CommentsController@index'); // Show all comments
    Route::get('/show/{id}', 'App\Http\Controllers\CommentsController@show'); // Show comment by its id
    Route::get('/event/{event_id}', 'App\Http\Controllers\CommentsController@showAllForEvent'); // Show comments to event by event id
    Route::post('/create/{event_id}', 'App\Http\Controllers\CommentsController@store'); // Create new comment with use of event id
    Route::post('/update/{id}', 'App\Http\Controllers\CommentsController@update'); // Update comment by its id
    Route::post('/delete/{id}', 'App\Http\Controllers\CommentsController@destroy'); //Delete comment by its id
});
Route::prefix('users')->group(function () {
    Route::get('/show_all', 'App\Http\Controllers\UsersController@index'); // Show all users
    Route::get('/show/{id}', 'App\Http\Controllers\UsersController@show'); // Show user by its id
    Route::patch('/update/{id}', 'App\Http\Controllers\UsersController@update'); // Update user by its id
    Route::post('/delete/{id}', 'App\Http\Controllers\UsersController@destroy'); //Delete user by its id
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
use App\Models\Events;
use Carbon\Carbon;

class SubscriptionsController extends Controller
{
    public function subscribeToEvent(Request $request, $event_id)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ], 401);
        } else {
            $event = Events::find($event_id);
            if (!$event) {
                return response([
                    'message' => 'No such event'
                ], 400);
            }
            $price = $event->price;
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $sub_id = DB::table('events_subs')->where('event_id', $event_id)->where('user_id', $user->id)->value('id');
            if ($sub_id) {
                return response([
                    'message' => 'You can\'t subscribe to this event again'
                ], 400);
            }
            if ($price == 0) {
                DB::table('events_subs')->insert([
                    'event_id' => $event_id,
                    'user_id' => $user->id,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]);
                return response([
                    'message' => 'You subscribed to this event'
                ], 200);
            } else {
                if ($request->input('status') == 'true') {
                    DB::table('events_subs')->insert([
                        'event_id' => $event_id,
                        'user_id' => $user->id,
                        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                        'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                    ]);
                    return response([
                        'message' => 'You subscribed to this event'
                    ], 200);
                } else {
                    return response([
                        'message' => 'You can\'t subscribe to this event'
                    ], 400);
                }
            }
        }
    }
    public function subscribeToOrganizer(Request $request, $event_id)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ], 401);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $event = Events::find($event_id);
            $organizer_id = $event->organizer_id;
            DB::table('organizers_subs')->insert([
                'organizers_id' => $organizer_id,
                'user_id' => $user->id,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
            return response([
                'message' => 'You subscribed to this organizer'
            ], 200);
        }
    }
    public function showSubscribedUsers($event_id)
    {
        $users = DB::table('events_subs')->where('event_id', $event_id)->pluck('user_id');
        $arr = [];
        foreach ($users as $user) {
            $add = DB::table('users')->where('id', $user)->get(['id', 'username']);
            array_push($arr, $add[0]);
        }
        return $arr;
    }
    public function showOrganizerEvents($event_id)
    {
        $organizer_id = DB::table('events')->where('id', $event_id)->value('organizer_id');
        $events = DB::table('events')->where('organizer_id', $organizer_id)->get();
        return $events;
    }
    public function showMySubs(Request $request)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ], 401);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $events = [];
            $events_ids = DB::table('events_subs')->where('user_id', $user->id)->pluck('event_id');
            foreach ($events_ids as $event_id) {
                $add = DB::table('events')->where('id', $event_id)->get();
                array_push($events, $add[0]);
            }
            return $events;
        }
    }
    public function unsubscribeFromEvent(Request $request, $event_id)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ], 401);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $event = DB::table('events_subs')->where('event_id', $event_id)->where('user_id', $user->id);
            if (!$event) {
                return response([
                    'message' => 'No such subscription'
                ], 400);
            } else {
                $event->delete();
                return response([
                    'message' => 'You unsubscribed from event'
                ], 200);
            }
        }
    }
}

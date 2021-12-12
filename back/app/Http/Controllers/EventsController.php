<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
use App\Models\Events;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Mail;
use App\Mail\NewEventNotification;

class EventsController extends Controller
{
    public function index()
    {
        $allEvents = Events::all();
        return $allEvents;
    }
    public function show($id)
    {
        $showEvents = Events::find($id);
        return $showEvents;
    }
    public function store(Request $request)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ]);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $organizer = $user->id;
            $title = $request->input('title');
            $description = $request->input('description');
            $price = $request->input('price');
            $theme = $request->input('theme');
            $features = $request->input('features');
            $place = $request->input('place');
            $creditianals = [
                'organizer_id' => $organizer,
                'title' => $title,
                'description' => $description,
                'price' => $price,
                'theme' => $theme,
                'features' => $features,
                'place' => $place,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ];
            $createEvent = Events::create($creditianals);
            $details_api = [
                'title' => 'One of organizers has created new event',
                'body' => 'Your link to check event: http://127.0.0.1:8000/api/events/show/' . $createEvent->id
            ];
            $users = DB::table('organizers_subs')->where('organizers_id', $organizer)->get(['user_id']);
            foreach ($users as $user_id) {
                $userInfo = User::find($user_id->user_id);
                Mail::to($userInfo->email)->send(new NewEventNotification($details_api));
            }
            return response([
                'message' => 'Event created',
                'event' => $createEvent,

            ]);
        }
    }
    public function update(Request $request, $event_id)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ]);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $event = Events::find($event_id);
            if ($user->id == $event->organizer_id || $this->checkAdmin($request)) {
                $update = Events::find($event_id);
                $update->update($request->all());
                return response([
                    'message' => 'Event updated',
                    'event' => $update
                ]);
            } else {
                return response([
                    'message' => 'You can not update this event'
                ]);
            }
        }
    }
    public function destroy(Request $request, $event_id)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ]);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $event = Events::find($event_id);
            if ($user->id == $event->organizer_id || $this->checkAdmin($request)) {
                $delete = Events::find($event_id);
                $delete->delete();
                DB::table('events_subs')->where('event_id', $event_id)->delete();
                return response([
                    'message' => 'Event deleted'
                ]);
            } else {
                return response([
                    'message' => 'You can not delete this event'
                ]);
            }
        }
    }
}

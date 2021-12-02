<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\DB;
use App\Models\Events;
use Carbon\Carbon;

class EventsController extends Controller {
    public function index() {
        $allEvents = Events::all();
        return $allEvents;
    }
    public function show($id) {
        $showEvents = Events::find($id);
        return $showEvents;
    }
    public function store(Request $request) {
        $user = $this->checkLogIn($request);
        if(!$user) {
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
            $creditianals = [
                'organizer_id' => $organizer,
                'title' => $title,
                'description' => $description,
                'price' => $price,
                'theme' => $theme,
                'features' => $features,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ];
            $createEvent = Events::create($creditianals);
            return response([
                'message' => 'Event created',
                'event' => $createEvent
            ]);
        }
    }
    public function update(Request $request, $event_id) {
        $user = $this->checkLogIn($request);
        if(!$user) {
            return response([
                'message' => 'User is not logged in'
            ]);
        }
        else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $event = Events::find($event_id);
            if($user->id == $event->organizer_id) {
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
    public function destroy(Request $request, $event_id) {
        $user = $this->checkLogIn($request);
        if(!$user) {
            return response([
                'message' => 'User is not logged in'
            ]);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $event = Events::find($event_id);
            if($user->id == $event->organizer_id) {
                $delete = Events::find($event_id);
                $delete->delete();
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

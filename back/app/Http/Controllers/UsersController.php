<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;

class UsersController extends Controller
{
    public function index()
    {
        $allComments = User::all();
        return $allComments;
    }
    public function show($id)
    {
        $showComment = User::find($id);
        return $showComment;
    }
    public function update(Request $request, $id)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ], 401);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $userFind = User::find($id);
            if ($user->id == $userFind->id || $this->checkAdmin($request)) {
                $update = User::find($id);
                $update->update($request->all());
                return response([
                    'message' => 'User updated',
                    'user' => $update
                ], 200);
            } else {
                return response([
                    'message' => 'You can not update this user'
                ], 400);
            }
        }
    }
    public function destroy(Request $request, $id)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ], 401);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $userFind = User::find($id);
            if ($user->id == $userFind->id || $this->checkAdmin($request)) {
                $delete = User::find($id);
                $delete->delete();
                DB::table('events')->where('organizer_id', $user->id)->delete();
                DB::table('events_subs')->where('user_id', $user->id)->delete();
                DB::table('organizers_subs')->where('user_id', $user->id)->delete();
                DB::table('comments')->where('user_id', $user->id)->delete();
                return response([
                    'message' => 'User deleted'
                ], 200);
            } else {
                return response([
                    'message' => 'You can not delete this user'
                ], 400);
            }
        }
    }
    public function showOrganizer($id)
    {
        $org_id = DB::table('events')->where('id', $id)->value('organizer_id');
        $showComment = User::find($org_id);
        return $showComment;
    }
}

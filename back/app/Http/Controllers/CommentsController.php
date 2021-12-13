<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Comments;
use Illuminate\Support\Facades\DB;
use Tymon\JWTAuth\Facades\JWTAuth;
use Carbon\Carbon;

class CommentsController extends Controller
{
    public function index()
    {
        $allComments = Comments::all();
        return $allComments;
    }
    public function show($id)
    {
        $showComment = Comments::find($id);
        return $showComment;
    }
    public function showAllForEvent($event_id)
    {
        $showComment = DB::table('comments')->where('event_id', $event_id)->get();
        return $showComment;
    }
    public function store(Request $request, $event_id)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ], 401);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $title = $request->input('title');
            $description = $request->input('description');
            $creditianals = [
                'event_id' => $event_id,
                'user_id' => $user->id,
                'title' => $title,
                'description' => $description,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ];
            $createComment = Comments::create($creditianals);
            return response([
                'message' => 'Comment created',
                'comment' => $createComment
            ], 200);
        }
    }
    public function update(Request $request, $comment_id)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ], 401);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $comment = Comments::find($comment_id);
            if ($user->id == $comment->user_id || $this->checkAdmin($request)) {
                $update = Comments::find($comment_id);
                $update->update($request->all());
                return response([
                    'message' => 'Comment updated',
                    'comment' => $update
                ], 200);
            } else {
                return response([
                    'message' => 'You can not update this comment'
                ], 400);
            }
        }
    }
    public function destroy(Request $request, $comment_id)
    {
        $user = $this->checkLogIn($request);
        if (!$user) {
            return response([
                'message' => 'User is not logged in'
            ], 401);
        } else {
            $user = JWTAuth::toUser(JWTAuth::getToken());
            $comment = Comments::find($comment_id);
            if ($user->id == $comment->user_id || $this->checkAdmin($request)) {
                $delete = Comments::find($comment_id);
                $delete->delete();
                return response([
                    'message' => 'Comment deleted'
                ], 200);
            } else {
                return response([
                    'message' => 'You can not delete this comment'
                ], 400);
            }
        }
    }
}

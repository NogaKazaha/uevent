<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\CommentsRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class CommentsCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;
    public function setup()
    {
        CRUD::setModel(\App\Models\Comments::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/comments');
        CRUD::setEntityNameStrings('comments', 'comments');
    }
    protected function setupListOperation()
    {
        CRUD::column('id');
        CRUD::column('event_id');
        CRUD::column('user_id');
        CRUD::column('title');
        CRUD::column('description');
    }
    protected function setupShowOperation() {
        CRUD::column('id');
        CRUD::column('event_id');
        CRUD::column('user_id');
        CRUD::column('title');
        CRUD::column('description');
    }
    protected function setupCreateOperation()
    {
        CRUD::setValidation(CommentsRequest::class);

        CRUD::field('event_id');
        CRUD::field('user_id');
        CRUD::field('title');
        CRUD::field('description');
    }
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}

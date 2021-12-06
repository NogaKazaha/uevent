<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EventsSubsRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;

class EventsSubsCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;
    public function setup()
    {
        CRUD::setModel(\App\Models\EventsSubs::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/events-subs');
        CRUD::setEntityNameStrings('events subs', 'events subs');
    }
    protected function setupListOperation()
    {
        CRUD::column('id');
        CRUD::column('event_id');
        CRUD::column('user_id');
        CRUD::column('created_at');
    }
    protected function setupShowOperation()
    {
        CRUD::column('id');
        CRUD::column('event_id');
        CRUD::column('user_id');
        CRUD::column('created_at');
    }
    protected function setupCreateOperation()
    {
        CRUD::setValidation(EventsSubsRequest::class);

        CRUD::field('event_id');
        CRUD::field('user_id');
    }
    
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}

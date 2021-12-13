<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\EventsRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Illuminate\Support\Facades\DB;

class EventsCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation {
        destroy as traitDestroy;
    }
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;
    public function setup()
    {
        CRUD::setModel(\App\Models\Events::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/events');
        CRUD::setEntityNameStrings('events', 'events');
    }
    protected function setupListOperation()
    {
        CRUD::column('id');
        CRUD::column('organizer_id');
        CRUD::column('title');
        CRUD::column('description');
        CRUD::column('price');
        CRUD::column('theme');
        CRUD::column('features');
        CRUD::column('place');
        CRUD::column('date');
    }
    protected function setupShowOperation()
    {
        CRUD::column('id');
        CRUD::column('organizer_id');
        CRUD::column('title');
        CRUD::column('description');
        CRUD::column('price');
        CRUD::column('theme');
        CRUD::column('features');
        CRUD::column('place');
        CRUD::column('date');
    }
    protected function setupCreateOperation()
    {
        CRUD::setValidation(EventsRequest::class);

        CRUD::field('organizer_id');
        CRUD::field('title');
        CRUD::field('description');
        CRUD::field('price');
        CRUD::field('theme');
        CRUD::field('features');
        CRUD::modifyField('features', [
            'type' => 'enum',
        ]);
        CRUD::column('place');
        CRUD::column('date');
    }
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
    public function destroy($id)
    {
        $this->crud->hasAccessOrFail('delete');
        DB::table('events_subs')->where('event_id', $id)->delete();;
        return $this->crud->delete($id);
    }
}

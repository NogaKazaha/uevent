<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\OrganizersSubsRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
class OrganizersSubsCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;
    public function setup()
    {
        CRUD::setModel(\App\Models\OrganizersSubs::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/organizers-subs');
        CRUD::setEntityNameStrings('organizers subs', 'organizers subs');
    }
    protected function setupListOperation()
    {
        CRUD::column('id');
        CRUD::column('organizers_id');
        CRUD::column('user_id');
        CRUD::column('created_at');
        CRUD::column('updated_at');
    }
    protected function setupCreateOperation()
    {
        CRUD::setValidation(OrganizersSubsRequest::class);

        CRUD::field('id');
        CRUD::field('organizers_id');
        CRUD::field('user_id');
        CRUD::field('created_at');
        CRUD::field('updated_at');
    }
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
}

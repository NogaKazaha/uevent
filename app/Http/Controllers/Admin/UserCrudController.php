<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\UserRequest;
use Backpack\CRUD\app\Http\Controllers\CrudController;
use Backpack\CRUD\app\Library\CrudPanel\CrudPanelFacade as CRUD;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class UserCrudController extends CrudController
{
    use \Backpack\CRUD\app\Http\Controllers\Operations\ListOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\CreateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\UpdateOperation;
    use \Backpack\CRUD\app\Http\Controllers\Operations\DeleteOperation { destroy as traitDestroy; }
    use \Backpack\CRUD\app\Http\Controllers\Operations\ShowOperation;
    public function setup()
    {
        CRUD::setModel(\App\Models\User::class);
        CRUD::setRoute(config('backpack.base.route_prefix') . '/user');
        CRUD::setEntityNameStrings('user', 'users');
    }
    protected function setupListOperation()
    {
        CRUD::column('id');
        CRUD::column('username');
        CRUD::column('password');
        CRUD::column('email');
        CRUD::column('status');
        CRUD::column('created_at');
    }
    protected function setupShowOperation()
    {
        CRUD::column('id');
        CRUD::column('username');
        CRUD::column('password');
        CRUD::column('email');
        CRUD::column('status');
        CRUD::column('created_at');
    }
    protected function setupCreateOperation()
    {
        CRUD::setValidation(UserRequest::class);

        CRUD::field('username');
        CRUD::field('password');
        CRUD::field('email');
        CRUD::field('status');
        CRUD::modifyField('status', [
            'type' => 'enum',
        ]);
    }
    protected function setupUpdateOperation()
    {
        $this->setupCreateOperation();
    }
    public function destroy($id)
    {
        $this->crud->hasAccessOrFail('delete');
        DB::table('events')->where('organizer_id', $id)->delete();
        DB::table('events_subs')->where('user_id', $id)->delete();
        DB::table('organizers_subs')->where('user_id', $id)->delete();
        DB::table('comments')->where('user_id', $id)->delete();
        return $this->crud->delete($id);
    }
    protected function setupDeleteOperation() {
        
    }
}

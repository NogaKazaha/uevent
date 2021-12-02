<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrganizersSubsTable extends Migration {
    public function up() {
        Schema::create('organizers_subs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('organizers_id');
            $table->unsignedBigInteger('user_id');
            $table->foreign('organizers_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('user_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('organizers_subs');
    }
}

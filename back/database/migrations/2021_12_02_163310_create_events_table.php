<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEventsTable extends Migration
{
    public function up() {
        Schema::create('events', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('organizer_id');
            $table->string('title', 64);
            $table->string('description', 2048);
            $table->string('price', 256);
            $table->string('theme', 64);
            $table->enum('features', ['conference', 'lectures', 'workshop', 'fest']);
            $table->foreign('organizer_id')->references('id')->on('users')->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();
        });
    }
    public function down() {
        Schema::dropIfExists('events');
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Carbon\Carbon;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'username' => "NogaKazaha",
            'email' => "nogakazahawork@gmail.com",
            'password' => Hash::make('qweasdzxc'),
            'status' => 'admin',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('events')->insert([
            'organizer_id' => 1,
            'title' => 'Test event',
            'description' => 'This is test description',
            'price' => 0,
            'theme' => 'test',
            'features' => 'workshop',
            'place' => 'вулиця Кирпичова, 2, Харків, Харківська область',
            'date' => '2022-01-01',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
        DB::table('comments')->insert([
            'event_id' => 1,
            'user_id' => 1,
            'title' => 'Test comment',
            'description' => 'This is test comment description',
            'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
        ]);
    }
}

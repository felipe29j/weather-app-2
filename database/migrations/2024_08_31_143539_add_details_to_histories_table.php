<?php


use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddDetailsToHistoriesTable extends Migration
{
    public function up()
    {
        Schema::table('histories', function (Blueprint $table) {
            $table->integer('humidity')->nullable();
            $table->integer('wind_speed')->nullable();
            $table->integer('visibility')->nullable();
        });
    }

    public function down()
    {
        Schema::table('histories', function (Blueprint $table) {
            $table->dropColumn(['humidity', 'wind_speed', 'visibility']);
        });
    }
}


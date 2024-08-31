<?php

// app/Models/History.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class History extends Model
{
    protected $fillable = [
        'city', 'temperature', 'condition', 'humidity', 'wind_speed', 'visibility'
    ];
}


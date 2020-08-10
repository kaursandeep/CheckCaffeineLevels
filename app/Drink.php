<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Drink extends Model
{
    //
    protected $table='drinks';

    protected $fillable=['id','drink_name','description','caffeine_level','	number_of_servings'];
}

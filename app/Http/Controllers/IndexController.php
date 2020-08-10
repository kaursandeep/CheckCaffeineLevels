<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use DB;


class IndexController extends Controller
{
    function index(Request $request){
  
        $data=$request->all();

        //get drink details from db
        $selectedDrink = DB::table('drinks')
                     ->where('drink_name', $data['selectedDrink'])
                     ->first();

        //return $data;
        $selectedDrinkName=$selectedDrink->drink_name;
        $numberOfServingsPerDrink=$selectedDrink->number_of_servings;
        $CaffeineLevelPerServing=$selectedDrink->caffeine_level;
        $selectedDrinkCaffeineLevel=$numberOfServingsPerDrink*$CaffeineLevelPerServing;
        $caffeineSafeLevel=500;
        $numberOfDrinksConsumed=intval($data['numberOfDrinksConsumed']);

        $consumedCaffeine=$selectedDrinkCaffeineLevel*$numberOfDrinksConsumed;

        //if consumed caffeine is already more than safe level
        if($consumedCaffeine>$caffeineSafeLevel){
            $moreDrinksThatCanBeConsumed=0;

            return "Your have already consumed more caffeine than the safe level, ".
        "so you can not consume " .
        "any more " .
        $selectedDrinkName;
        }

        else {
        $moreCaffeineThatCanBeTaken=$caffeineSafeLevel-$consumedCaffeine;
        $moreDrinksThatCanBeConsumed= intdiv($moreCaffeineThatCanBeTaken, $selectedDrinkCaffeineLevel);
        
        return "Your consumed caffeine level is " .
        $consumedCaffeine .
        " You can consume " .
        $moreDrinksThatCanBeConsumed .
        " more " .
        $selectedDrinkName .
        " to have safe levels of Caffeine.";
    
    }
    }
}

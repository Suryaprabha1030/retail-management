<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Hash;
use App\Models\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller

{
   public function regis(Request $request){

    $data=Auth::create([
        "name"=>$request->name,
        "password"=>Hash::make($request->password)
    ]);
    return ["data"=>$data];
   }
   public function login(Request $request) {

        $data=Auth::where("name",$request->name)->first();

        if($data && Hash::check($request->password,$data->password))
        {
           return response(["success"=>"successfuly"],200);
        }
        else{
            return response(["error"=>"your password is incorrect"],401);
        }

        return $data;

    }
}

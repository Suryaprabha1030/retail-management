<?php

namespace App\Http\Controllers;
use App\Models\Form;
use Illuminate\Http\Request;

class FormController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data=Form::all();
        return response(["data" =>$data],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

            $data=$request->only(["name","password","designation","native","phnNo","aadhaNo"]);
            Form::create($data);
            return response(["data"=>$data],200);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Form $form)
    {
        return response(['data'=>$form],200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,Form $form )

    {
        $data=$request->only(["name","password","designation","native","phnNo","aadhaNo"]);
        $form->update($data);
        return response(["data"=>$form],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Form $form)
    {
       $form->delete();
       return response(["message"=>"data deleted successfully"],200);
    }
}

<?php

namespace App\Http\Controllers;
use App\Models\Invent;

use Illuminate\Http\Request;

class InventController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data=Invent::all();
        return response(["data"=>$data],200);

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
        $data=$request->only(["productName","company","catagory","quantity","MRP","costPrice","vendorNo"]);
        Invent::create($data);
        return response(["message"=>"added successfully","data"=>$data],200);
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
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,Invent $invent)
    {
        $data=$request->only(["productName","company","catagory","quantity","MRP","costPrice","vendorNo"]);
        $invent->update($data);
        return response(["data"=> $invent],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Invent $invent)
    {
        $invent->delete();
        return response(["message"=>"successfully deleted"],200);
    }
    public function getColumnData(Request $request)
    {
       $query=$request->input("query");
       $result=Invent::where("productName","like",'%'.$query.'%')->get();
       return $result;
    }



}

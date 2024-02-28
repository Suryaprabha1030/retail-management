import React, { useState } from 'react'
import axios from "axios"

const Create = () => {

    const[task,setTask]=useState({
        title:"",
        task:""
    })
    const[loading,setloading]=useState()

    const changeObj=(e)=>{setTask({...task,[e.target.name]:e.target.value})}

    const create=async(e)=>{
        e.preventDefault();
        try{
            const res=await axios.post("http://127.0.0.1:8000/api/tasks",task)
            console.log(res)
            // setloading(true)
        }
        catch(err){
            console.log("something wrong",err)
        }
    }


  return (
    <div className='w-screen h-screen flex justify-center items-center'>
    <div className='w-1/2 h-1/2 bg-blue-200 flex flex-col justify-center gap-10  rounded-md'>
    <h1 className='text-3xl text-center text-slate-500'>Create Task</h1>
   <div className=' flex flex-col gap-5 align-center items-center pb-10'>
    <input className='w-1/2 p-3 rounded-lg border-slate-500 text-xl outline-none focus:outline-blue-500' name="title" type="text" onChange={(e)=>changeObj(e)} placeholder='Title'/>
    <input className='w-1/2  p-3 rounded-lg border-slate-500 text-xl outline-none focus:outline-blue-500' name="task" type="text" onChange={(e)=>changeObj(e)} placeholder='Description'/>
    <button className='w-1/5 p-2 rounded-full bg-green-500 text-white text-xl font-bold active:bg-blue-500' type="submit" onClick={e=>create(e)}>ADD</button>

   </div>

    </div>
   </div>
  )
}

export default Create

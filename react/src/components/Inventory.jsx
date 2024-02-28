import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Inventory = () => {
    const url=`${import.meta.env.VITE_API_BASE_URL}/api`
// using useref hooks for intracting elements via ref attributes
 const nameRef=useRef();
 const companyRef=useRef();
 const catagoryRef=useRef();
 const quantityRef=useRef();
 const mrpRef=useRef();
 const costRef=useRef();
 const numRef=useRef();
//  usestate
const[invts,setInvts]=useState([])
// loading
const[loading,setLoding]=useState(false)
//useEffect hook for using getdata from db when that dependency([]) state change

useEffect(()=>{
   getinvt();
},[])

// selected data using usestate
const[selectedData,setSelecteddata]=useState([])
//  add data
const addData=async(e)=>{


    e.preventDefault();

    const data={
        productName:nameRef.current.value,
        company:companyRef.current.value,
        catagory:catagoryRef.current.value,
        quantity:quantityRef.current.value,
        MRP:mrpRef.current.value,
        costPrice:costRef.current.value,
        vendorNo:numRef.current.value}
    try{
        const res=await axios.post(url+"/invents",data)
        console.log(res.data.data)
        setLoding(true)
        toast.success("data added succesfully",{
            position: "top-center",
            autoClose:8000 })
        getinvt()


    }
    catch(err){
        console.log("err",err)
        toast.error("data failed to stroe",{
            position: "top-center",
            autoClose:8000 })


    }}

// read
const getinvt=async(e)=>{
    setLoding(true)
    const res=await axios.get(url+"/invents")
    setInvts(res.data.data)
    console.log(res.data.data)
}
//edit
//row click
 const rowClick=(u)=>{

    nameRef.current.value=""
    companyRef.current.value=""
    catagoryRef.current.value=""
    quantityRef.current.value=""
    costRef.current.value=""
    mrpRef.current.value=""
    numRef.current.value=""

    setSelecteddata(u)
    if(selectedData){
    console.log(selectedData.productName)}
}
const editData=(e)=>{
    nameRef.current.value=""
    companyRef.current.value=""
    catagoryRef.current.value=""
    quantityRef.current.value=""
    costRef.current.value=""
    mrpRef.current.value=""
    numRef.current.value=""
    e.preventDefault()
    if(selectedData){
        nameRef.current.value=selectedData.productName
        companyRef.current.value=selectedData.company
        catagoryRef.current.value=selectedData.catagory
        quantityRef.current.value=selectedData.quantity
        costRef.current.value=selectedData.costPrice
        mrpRef.current.value=selectedData.MRP
        numRef.current.value=selectedData.vendorNo

}
}
// update
const updateData=async(e)=>{
    e.preventDefault()
    try{
    const id=selectedData.id
    const datas={
        productName: nameRef.current.value,
        company:companyRef.current.value,
        catagory:catagoryRef.current.value,
        quantity: quantityRef.current.value,
        costPrice: costRef.current.value,
        MRP: mrpRef.current.value,
        vendorNo:numRef.current.value
    }

    const res=await axios.put(url+"/invents/"+id,datas)
    setLoding(true)
    getinvt()
    toast.success("Data updated successfully",{
        position:"top-center",
        autoClose:7000
    })
    nameRef.current.value=""
    companyRef.current.value=""
    catagoryRef.current.value=""
    quantityRef.current.value=""
    costRef.current.value=""
    mrpRef.current.value=""
    numRef.current.value=""}
    catch(err){
        toast.error("failed to updated",{
            position:"top-center",
            autoClose:8000
        })
    }
}

// delete

const delData=async(e)=>{
    try{
    const id=selectedData.id;
    const res=await axios.delete(url+"/invents/"+id)
    toast.success("data deleted successfully",{
        position:"top-center",
        autoClose:8000
    })
    console.log(res)
    getinvt()}
    catch(err){
        toast.error("Data failed to deleted",{
            position:'top-center',
            autoClose:8000

        })

    }
}


  return (
    <div className='w-screen h-screen border-8 border-indigo-900'>
     <a href='/admin'><button className='w-1/3 mt-2  h-8 absolute top-3 left-3  font-bold rounded-lg ' ><img src='/src/assets/exit.png' className='w-10 h-10 ms-3' /></button></a>

      {/* form-----------------------*/}
      <div className='w-full h-full flex flex-row'>
      <div className='w-1/3  bg-gray-200'>
        <h1 className='text-3xl text-center pt-10 font-bold text-blue-800'>Inventory Deatil</h1>
        <div className='flex flex-col justify-center items-center  text-center mt-10'>
        <input className='p-6 w-3/4 h-10 border-0 rounded-md mt-2' ref={nameRef} placeholder='ProductName'/>
        <input className='p-6 w-3/4 h-10 border-0 rounded-md mt-8' ref={companyRef} placeholder='Company'/>
        <input className='p-6 w-3/4 h-10 border-0 rounded-md mt-8' ref={catagoryRef} placeholder='Catagory'/>

        <div className='flex flex-row  justify-center items-center mt-8'>
        <input className='p-6 w-1/3 h-10 border-0 rounded-md me-10' ref={quantityRef} placeholder='Quantity'/>
        <input className='p-6 w-1/3 h-10 border-0 rounded-md' ref={mrpRef} placeholder='MRP'/>
        </div>

        <div className='flex flex-row  justify-center items-center mt-8'>
        <input className='p-6 w-1/3 h-10 border-0 rounded-md me-10' ref={costRef} placeholder='CostPrice'/>
        <input className=' p-6 w-1/3 h-10 border-0 rounded-md' ref={numRef} placeholder='VendorNo'/>
        </div>
        </div>
        <div className='flex flex-row gap-5  justify-center items-center mt-10'>

            <button className='w-1/6 h-10 rounded-md bg-blue-800 text-lg text-white font-bold ' onClick={e=>addData(e)}>Add</button>
            <button className='w-1/6 h-10 rounded-md bg-blue-800 text-lg text-white font-bold ' onClick={e=>editData(e)}>Edit</button>
            <button className='w-1/6 h-10 rounded-md bg-blue-800 text-lg text-white font-bold ' onClick={updateData}>Update</button>
            <button className='w-1/6 h-10 rounded-md bg-blue-800 text-lg text-white font-bold ' onClick={delData}>Delete</button>
        </div>
      </div>
      {/* table------------------------- */}
      <div  className='w-3/4 h-full overflow-y-scroll'>
        <table className='w-full table-fixed border-collapse border-slate-400 text-center'>
            <thead>
                <tr className='border-2 border-slate-800'>
                    <th className='w-12 text-center p-5 text-xl border-2 border-s-2 border-slate-800'>Id</th>
                    <th className='p-5 border-2 border-slate-800 '>Name</th>
                    <th className='p-5 border-2 border-slate-800'>Company</th>
                    <th className='p-5 border-2 border-slate-800'>catagory</th>
                    <th className='p-5 border-2 border-slate-800'>Quantity</th>
                    <th className='p-5 border-2 border-slate-800'>MRP</th>
                    <th className='border-2 border-slate-800 p-5'>CostPrice</th>
                    <th className='border-2 border-slate-800 p-5'>VendorNo</th>
             </tr>
             </thead>
            {loading &&
           <tbody>
           {invts.map(u=>(
           <tr key={u.id}  className={selectedData==u ? "bg-blue-200" : ""} onClick={()=>rowClick(u)}>
                    <th className='p-4 text-md border-2  border-slate-500 text-center'>{u.id}</th>
                    <th className='border-2 border-slate-400 '>{u.productName}</th>
                    <th className='border-2 border-slate-400 p-5'>{u.company}</th>
                    <th className='border-2 border-slate-400 p-5'>{u.catagory}</th>
                    <th className='border-2 border-slate-400 p-5'>{u.quantity}</th>
                    <th className='border-2 border-slate-400 p-5'>{u.MRP}</th>
                    <th className='border-2 border-slate-400 p-5'>{u.costPrice}</th>
                    <th className='border-2 border-slate-400 p-5'>{u.vendorNo}</th>
             </tr>
             ))}

            </tbody>}

        </table>
      </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Inventory


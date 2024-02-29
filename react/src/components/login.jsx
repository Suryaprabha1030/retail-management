import React, { useRef} from 'react'
import axios from "axios"
// import { useHistory } from "react-router-dom"
import { useNavigate } from 'react-router-dom';

import { ToastContainer, toast, } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';


const Login =() => {
    const history=useNavigate()
    const nameRef=useRef()
    const passRef=useRef()

    const login=async(e)=>{
        const url=`${import.meta.env.VITE_API_BASE_URL}/api`
         e.preventDefault();
        try{
            const data={
                    name:nameRef.current.value,
                    password:passRef.current.value}

        const res=await axios.post(url+"/login",data)
        history('/admin')
        }
        catch(err){
        toast.error("check your password")

        }}
  return (
    <div className='w-screen h-screen flex flex-row justify-center items-center relative'>

    <div className='w-1/2'>
    <a href='/'><button className='w-1/3 mt-2  h-8 absolute top-0 left-0  font-bold rounded-lg ' ><img src='/src/assets/exit.png' className='w-10 h-10 ms-3' /></button></a>
        <img src="/src/assets/login.jpeg" />
     </div>
     <div className='w-1/3 h-1/2  flex flex-col justify-center items-center gap-5 '>
        <h1 className='font-bold text-2xl mb-10 text-center'>ADMIN LOGIN</h1>
        <input className='w-1/2 border-b-2 text-2xl border-blue-300 outline-none mb-4' ref={nameRef} placeholder='Name'/>
        <input className='w-1/2 border-b-2 text-2xl border-blue-300 outline-none' ref={passRef} placeholder='Password'/>
        <button className='w-1/4 h-10  text-white mt-5  text-xl font-bold rounded-lg bg-red-500' onClick={login}>Login</button>

     </div>

     <ToastContainer/>


    </div>
  )
}

export default Login

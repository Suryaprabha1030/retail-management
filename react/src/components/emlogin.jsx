import React from 'react'

const Emlogin = ({}) => {
  return (
    <div className='w-screen h-screen flex flex-row justify-center items-center '>
    <div className='w-1/2'>
        <img src="/login.jpeg"/>
     </div>
     <div className='w-1/3 h-1/2  flex flex-col justify-center items-center gap-5 '>
        <h1 className='font-bold text-2xl mb-10 text-center'>{title}</h1>
        <input className='w-1/2 border-b-2 text-2xl border-blue-300 outline-none mb-4' ref={nameRef} placeholder='Name'/>
        <input className='w-1/2 border-b-2 text-2xl border-blue-300 outline-none' ref={passRef} placeholder='password'/>
        <button className='w-1/4 h-10  text-white mt-5  text-xl font-semibold rounded-lg bg-red-500' onClick={namefun}>{btnName}</button>

     </div>
     {/* <a href="" className='w-1/4 h-10'></a> */}
     <ToastContainer/>


    </div>
  )
}

export default Emlogin

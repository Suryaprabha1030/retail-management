import React from 'react'
import { ToastContainer, toast } from 'react-toastify'

const Admin = () => {
    return (
    <div>
      <div className=' w-screen h-screen bg-[url("/src/assets/bg.jpeg")] bg-cover bg-center'>

      <a href='/'><button className='w-1/3 mt-2  h-8 absolute top-3 left-8  font-bold rounded-lg ' ><img src='/src/assets/exit.png' className='w-15 h-12 ' /></button></a>
      <div className='w-full h-1/6 text-blue-800 text-6xl font-bold text-center  pt-40 pe-10'>GREY RETAIL</div>
        <div className='w-full h-3/5 flex flex-row  justify-center items-center gap-20 ps-5'>
            <a href="/employ"><img src='/src/assets/img7.jpeg' className='w-40 h-40' /></a>
            <a href="/inventory"><img src='/src/assets/img8.jpeg' className='w-40 h-40' /></a>
            <ToastContainer/>
        </div>

      </div>
    </div>
  )
}

export default Admin

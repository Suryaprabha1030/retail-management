import React from 'react'


const Index = () => {
  return (
    <div>
     <div className='bg-[url("/src/assets//bg.jpeg")] w-screen h-screen bg-cover bg-center relative'>
     <div className='w-full h-1/6 text-blue-800 text-6xl font-bold text-center  pt-40'>GREY RETAIL</div>
     <div className='w-full h-3/5 flex flex-row gap-20 justify-center items-center'>
     <a href='/login'><img src='/src/assets//img.jpeg' className='w-40 h-40'/></a>
     <a href='/bill'> <img src='/src/assets/bil.png' className='w-40 h-40 bg-white'/></a>

     </div>


     </div>
    </div>
  )
}

export default Index

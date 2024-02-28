import React, { useEffect, useRef, useState } from 'react'
 import axios from "axios"
 import { ToastContainer,toast } from 'react-toastify'

const Billing = () => {
    const url=`${import.meta.env.VITE_API_BASE_URL}/api`
    const nameRef=useRef()
    const qtyRef=useRef()
    const rateRef=useRef()
    const[items,setItems]=useState([])
    const[qty,setQty]=useState([])
    const[id,setId]=useState([])
    const[totalval,settotalval]=useState([])

    useEffect(()=>{
        total()
    },[items])

    const  getcol=async(e)=>{

        try{
        const res=await axios.get(url+"/cols",{
            params:{
                query:nameRef.current.value
            }
        })
        rateRef.current.value=res.data[0].MRP
        setQty(res.data[0].quantity)
        setId(res.data[0].id)}
        catch(err){
            toast.error("check input value")

        }
    }

const total=()=>{
    let total = 0;
    items.forEach(item => {
        total += parseInt(item.rate) * parseInt(item.qty);
    });
    settotalval(total)

}

const add=async(e)=>{
    const data={
        name:nameRef.current.value,
        qty:qtyRef.current.value,
        rate:rateRef.current.value
    }
    if (items.find((iu)=>iu.name == data.name)) {
        toast.error("this item already added")
        console.log("Item already exists in the list.");
        return;
    }

    setItems([...items,data])
    setQty(qty-qtyRef.current.value)

    const value={
        quantity:qty-qtyRef.current.value
    }
    const res=await axios.put("http://127.0.0.1:8000/api/invents/"+id,value)
    nameRef.current.value=""
    qtyRef.current.value=""
    rateRef.current.value=""
}

const removedata=(index)=>{
    const item=items.filter(item=> item.name !== items[index].name)
    setItems(item)

}
const print=()=>{
    const billcontent=document.getElementById("bill").innerHTML
    const orgcontent=document.body.innerHTML
    document.body.innerHTML=billcontent
    window.print()
    document.body.innerHTML=orgcontent
    window.location.reload()
}

return (
    <div className='w-screen h-screen border-8  border-indigo-900'>
        <div className='w-full h-full flex flex-row '>
                <div className='w-1/3  bg-gray-200'>
                   <a href='/'><button><img src='/src/assets/exit.png' className='w-10 h-10 ms-3 mt-3' /></button></a>
                    <h1 className='text-3xl text-center pt-10 font-bold text-blue-800'>Billing</h1>
                    <div className='flex flex-col justify-center items-center mt-10 '>
                        <div className='w-3/4 flex flex-row justify-around items-center '>
                        <input className='p-6 w-3/4 h-10 border-0 rounded-md mt-2' ref={nameRef}  placeholder='ProductName'/>
                        <button className=' w-1/6 ps-5' id="no-print" onClick={getcol}><img src="/src/assets/bin2.jpg" className='w-10 h-10'/></button>
                        </div>

                        <input type='number' min={1} className=' mt-10 p-6 w-3/4 h-10 border-0 rounded-md ' defaultValue={1}                                 ref={qtyRef}  placeholder='Quantity'/>
                        <input className='p-6 w-3/4 mt-10  h-10 border-0 rounded-md' ref={rateRef}  placeholder='Price/qty'/>
                        <div className='text-xl font-bold text-red-500 mb-5 me-48 mt-3 '>Current qty:{qty}</div>

                       <button className='w-3/4 h-10 me-18 mt-5 mt-10  rounded-lg font-bold bg-blue-800 text-xl text-white ' onClick={add}>Add</button>
                    </div>
               </div>
              <div className='w-2/6 h-full  overflow-y-scroll relative' id="bill" >
                        <div className='flex flex-col justify-center items-center'>
                            <h1 className='text-3xl font-bold'>Grey Retails</h1>
                            <p>122, dindugal main road,madurai-52</p>
                            <p>+91 789056479</p>
                        </div>
                        <div className='border-2 border-black'></div>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='w-2/4  text-xl font-bold text-center'>Name</div>
                            <div className='w-1/6 text-xl font-bold  text-center'>Qty</div>
                            <div className='w-1/5 text-xl font-bold  text-center'>Price</div>
                            <div className='w-1/5 text-xl font-bold  text-center' ></div>
                        </div>
                        {items.map((item, index) => (
                            <div key={index} className='w-full flex flex-row justify-around items-center mt-5'>
                                <div className='w-1/2 text-center text-black'>{item.name}</div>
                                <div className='w-1/5  text-center amount' id="amount">{item.qty}</div>
                                <div className='w-1/5  text-center amount' id="amount">Rs.{item.rate*item.qty}</div>
                                <div className='w-1/5 ps-5 text-xl font-bold  text-center' id="add" ></div>
                                <button className=' w-1/5 ps-5' id="no-print" onClick={()=>removedata(index)}><img src="/src/assets/bin.png" className='w-10 h-10'/></button>
                            </div>
                        ))}
                        <div className='flex flex-row justify-center items-center  mt-10'>

                                <button className=' w-1/5 text-xl ms-40 font-bold text-black'>Total</button>
                                <div  className=' w-1/5 text-xl me-10  font-bold text-black'> Rs.{totalval}</div>

                        </div>
                            <button className='w-2/5 bg-green-500  absolute bottom-0 text-white text-xl font-bold' id="btn" onClick={print}>Print</button>

               </div>

                <div className='w-1/4 mt-40'>
                    <img src='/src/assets/img5.jpeg'/>
                </div>

       </div>
    <ToastContainer/>

    </div>
  )
}

export default Billing


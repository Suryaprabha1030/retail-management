import React, { useEffect, useRef, useState } from 'react'
import { useStateContext } from './context/ContextProvider'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Employ = () => {
    const nameRef=useRef()
    const PasswordRef=useRef()
    const designationRef=useRef()
    const nativeRef=useRef()
    const phnRef=useRef()
    const aadharRef=useRef()
    const [users, setUsers] = useState([]);
    const [loading, setloading] = useState(false);
    const{setUser}=useStateContext()
    const[selectedData,setSelectedData]=useState(null)
// loaded data when initally rendering
    useEffect(() => {
        getUsers();

      }, [])

// ----------------- edit data---------------------------------------
     const rowClick=(udata)=>{
        nameRef.current.value=""
        PasswordRef.current.value=""
        designationRef.current.value=""
        nativeRef.current.value=""
        phnRef.current.value=""
        aadharRef.current.value=""
        setSelectedData(udata)
}
     const editRow=(e)=>{
        const id=selectedData.id
        console.log(id)
        e.preventDefault();
        if(selectedData){
            nameRef.current.value=selectedData.name;
            PasswordRef.current.value=selectedData.password;
            designationRef.current.value=selectedData.password;
            nativeRef.current.value=selectedData.native;
            phnRef.current.value=selectedData.phnNo;
            aadharRef.current.value=selectedData.aadhaNo;

        }
     }
// ---------------------add data---------------------------------------------
   const onSubmit=async(e)=>{

    const payload={
        name:nameRef.current.value,
        password:PasswordRef.current.value,
        designation:designationRef.current.value,
        native:nativeRef.current.value,
        phnNo:phnRef.current.value,
        aadhaNo:aadharRef.current.value

    }
    e.preventDefault();
    try{
        const res=await axios.post("http://127.0.0.1:8000/api/form",payload)
        console.log(res.data.data)
        setUser(res.data.data)
        setloading(true)
        toast.success("data added succcessfully",{
            position:"top-center",
            autoClose:8000
        })
    }
    catch(err){
        toast.error("Data failed to added",{
            position:"top-center",
            autoClose:8000
        })
        console.log("something wrong",err)
    }
    getUsers();
    nameRef.current.value=""
    PasswordRef.current.value=""
    designationRef.current.value=""
    nativeRef.current.value=""
    phnRef.current.value=""
    aadharRef.current.value=""

   }
// -------------read data from db----------------------
  const  getUsers=async(e)=>{
    setloading(true)
    const res=await axios.get("http://127.0.0.1:8000/api/forms")
    console.log(res.data.data)
    setUsers(res.data.data)


  }
// --------------update data-------------
const updateRow=async(e)=>{
  try{
    e.preventDefault();
    const id=selectedData.id
    const payload={
        name:nameRef.current.value,
        password:PasswordRef.current.value,
        designation:designationRef.current.value,
        native:nativeRef.current.value,
        phnNo:phnRef.current.value,
        aadhaNo:aadharRef.current.value

    }

    const response=await axios.put("http://127.0.0.1:8000/api/forms/"+id,payload)
     setloading(true)
     getUsers()
     toast.success("Data updated succcessfully",{
        position:"top-center",
        autoClose:8000
    })}
    catch(err){
        toast.error("Data failed to upadted",{
            position:"top-center",
            autoClose:8000
        })}


}
// -----deleted------
const deldata=async(e)=>{
    try{
    e.preventDefault()
    const id=selectedData.id
    const resp=await axios.delete("http://127.0.0.1:8000/api/forms/"+id)
    console.log(resp)
    getUsers()
    toast.success("Data deleted succcessfully",{
        position:"top-center",
        autoClose:8000
    })
}catch(err){
    toast.error("Data failed to deleted",{
        position:"top-center",
        autoClose:8000
    })
}

}
  return (
    <div className='w-screen h-screen border-8 border-indigo-800'>
     <a href='/admin'><button className='w-1/3 mt-2  h-8 absolute top-3 left-3  font-bold rounded-lg ' ><img src='/src/assets/exit.png' className='w-10 h-10 ms-3' /></button></a>
     <div className='w-full h-full flex fle-row'>
     {/* -----------------------form--------------------- */}
      <div className=' w-1/3 border-2 border-slate-300 bg-gray-200 text-center'>
     <form onSubmit={e=>onSubmit(e)}>
       <h1 className='text-3xl font-bold mt-10'>EMPLOYEE DETAIL</h1>
       <input className='w-3/4 outline-none  h-10 mt-12 p-5 text-xl' ref={nameRef} placeholder='Name'/>
       <input className='w-3/4  outline-none h-10 mt-7 p-5 text-xl' ref={PasswordRef} placeholder='Password'/>
       <input className='w-3/4 outline-none  h-10 mt-7 p-5 text-xl' ref={designationRef} placeholder='Designation'/>
       <input className='w-3/4 outline-none  h-10 mt-7 p-5 text-xl' ref={nativeRef} placeholder='Native'/>
       <input className='w-3/4 outline-none  h-10 mt-7 p-5 text-xl' ref={phnRef} placeholder='Phn No'/>
       <input className='w-3/4 outline-none  h-10 mt-7  p-5 text-xl' ref={aadharRef} placeholder='Aadhar No'/>
       <div className='flex flex-row gap-6 justify-center items-center mt-10'>
        <button className='w-20 h-10   rounded-lg font-bold bg-blue-800 text-xl text-white '>Add</button>
        <button className='w-20 h-10 rounded-lg font-bold bg-blue-800 text-xl text-white' onClick={editRow}>Edit</button>
        <button className='w-20 h-10  rounded-lg font-bold bg-blue-800 text-xl text-white' onClick={updateRow}>Update</button>
        <button className='w-20 h-10 rounded-lg font-bold bg-blue-800 text-xl text-white' onClick={deldata}>Delete</button>
       </div>
       </form>

    </div>

    {/* -------------------table ui--------------------- */}
      <div className='w-3/4 h-full overflow-y-scroll '>

        <table className='w-full table-fixed border-collapse border-spacing-2 '>

            <thead>
                <tr>
                    <th className='p-5 text-xl border-2 border-s-2 border-slate-500 '>ID</th>
                    <th className='p-5 border-2 border-slate-500  '>Name</th>
                    <th className='p-5 border-2 border-slate-500 '>Password</th>
                    <th className='p-5 border-2 border-slate-500 '>Designation</th>
                    <th className='p-5 border-2 border-slate-500 '>Native</th>
                    <th className='p-5 border-2 border-slate-500 '>Phn No</th>
                    <th className='p-5  border-2 border-slate-500 '>Adhar No</th>
                </tr>
            </thead>
            {loading &&
            <tbody>
            {users.map(u=>(

                <tr key={u.id} onClick={()=>rowClick(u)} className={selectedData== u?"bg-blue-200":""} >
                    <td className='p-4 text-md border-2  border-slate-500 text-center'>{u.id}</td>
                    <td className='p-4  text-md border-2 border-slate-500 '>{u.name}</td>
                    <td className='p-4 text-md  border-2 border-slate-500 '>{u.password}</td>
                    <td className='p-4 text-md  border-2 border-slate-500 '>{u.designation}</td>
                    <td className='p-4 text-md  border-2 border-slate-500 '>{u.native}</td>
                    <td className='p-4  text-md border-2 border-slate-500 '>{u.phnNo}</td>
                    <td className='p-4  text-md border-2 border-slate-500 '>{u.aadhaNo}</td>
                </tr>
            ))}

            </tbody>}
        </table>
    </div>
    </div>
      <ToastContainer/>
    </div>
  )
}

export default Employ

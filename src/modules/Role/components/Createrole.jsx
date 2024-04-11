import React, { useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import useRoles from '../core/action';



const Createrole = ({setAdd}) => {
  const {createRole} = useRoles();
    const [roleinfo , setRoleinfo] = useState({
        name : '',
        code : ''
    })
    const handleSubmit = async ()=>{
      createRole(roleinfo , setAdd)
    }




  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(62,64,87, 0.35)",
          zIndex: 3,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div  className='p-3 border rounded' style={{ width: "30%",backdropFilter: "blur(10px)" }}>
            <IoCloseCircleOutline style={{cursor:'pointer'}} onClick={()=>setAdd(false)} className='fs-3 text-danger mb-3 me-2'/>
            <span className='fs-4 text-white mb-3'>Create role</span>
            <input onChange={(e)=>setRoleinfo({...roleinfo , name : e.target.value})} className='form-control my-3' placeholder='Enter Role' type="text" />
            <input onChange={(e)=>setRoleinfo({...roleinfo , code : e.target.value})} className='form-control' placeholder='Enter Code' type="text" />
            <button onClick={handleSubmit} className='btn btn-primary w-100 mt-3'>Submit</button>
        </div>
      </div>
    </div>
  )
}

export default Createrole
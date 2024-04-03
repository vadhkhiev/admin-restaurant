
import React, { useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import getroles from '../../layout/core/getroles';
import { storeRoles } from '../../layout/core/roleSlice';

const UpdateRole = ({setUpdate}) => {

    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const id = useSelector((state) => state.id.id);
    const role = useSelector((state) => state.roles.roles)?.find((role)=>role.id == id);
    const [roleinfo , setRoleinfo] = useState({
        name : role?.name,
        code : role?.code
    })
    const [message , setMessage] = useState('')
    const [error , setError] = useState('')
    const dispatch = useDispatch(); 



    const handleSubmit = async ()=>{
        
        try {
            const response = await axios.put(
                '/api/roles/'+id,
                roleinfo,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setMessage('Successfully updated role');
            refetch();
            setTimeout(() => {
            setUpdate(false);
            }, 700);
        } catch (error) {
            setError(error.response.data.message);
        }
    }
    const refetch = async ()=>{
        try {
            const result = await getroles(token);
            dispatch(storeRoles(result))
        }
        catch (error) {
            console.error( error);
        }
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
        {
          id === 1 ? (
            <div className='p-3 border rounded' style={{ width: "30%",backdropFilter: "blur(10px)" }}>
              <IoCloseCircleOutline onClick={() => setUpdate(false)} style={{cursor:'pointer'}} className='fs-3 text-danger mb-3 me-2'/>
             <p className='text-center text-danger fw-bold'>You can't update super admin role</p>
            </div>
          ) : (
            <>
            <div  className='p-3 border rounded' style={{ width: "30%",backdropFilter: "blur(10px)" }}>
                <IoCloseCircleOutline style={{cursor:'pointer'}} onClick={()=>setUpdate(false)} className='fs-3 text-danger mb-3 me-2'/>
                <span className='fs-4 text-white mb-3'>Update role</span>
                <input onChange={(e)=>setRoleinfo({...roleinfo , name : e.target.value})} className='form-control my-3' placeholder={role?.name} type="text" />
                <input onChange={(e)=>setRoleinfo({...roleinfo , code : e.target.value})} className='form-control' placeholder={role?.code} type="text" />
                <button onClick={handleSubmit} className='btn btn-primary w-100 mt-3'>Submit</button>
            </div>
            </>
          )
        }
      </div>

      {
          message && <div style={{position:'fixed', top:'20px', left:'50%', transform:'translateX(-50%)', zIndex:4}} className="w-25 bg-success text-white text-center p-2 rounded ">
                Successfully updated role!
              </div>
      }
      {
          error && <div style={{position:'fixed', top:'20px', left:'50%', transform:'translateX(-50%)', zIndex:4}} className="w-25 bg-danger text-white text-center p-2 rounded ">
                {error}
         </div>
      }
    </div>
  )
}

export default UpdateRole
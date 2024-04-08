import React, { useState } from 'react'
import { IoCloseCircleOutline } from "react-icons/io5";
import axios from 'axios';
const DeleteRole = ({deletes , setDeletes , role , setRefetch , refetch}) => {
    const [message , setMessage] = useState('')
    const [error , setError] = useState('')
    

    const handleDelete = async () => {
        try {
            const response = await axios.delete(`/api/roles/${role.id}`);
            setMessage('Role deleted successfully')
            setRefetch(!refetch)
            setTimeout(() => {
              setDeletes(!deletes);
            }, 1000);
          } catch (error) {
            console.error(error);
            setError(error.response.data.message);    
          }
    }

  return (
    <>
    
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
          {
            role.id === 1 ? (
              <div>
                <IoCloseCircleOutline onClick={() => setDeletes(!deletes)} style={{cursor:'pointer'}} className='fs-3 text-danger mb-3 me-2'/>
               <p className='text-center text-danger'>You can't delete super admin role</p>
              </div>
            ) : (
              <>
               <div className='p-3 rounded text-center'>
            <p>
              Are you sure you want to{' '}
              <span className='text-danger'>delete</span>{' '}
              <b className='text-primary'>{role?.name}</b> from the list?
            </p>
            <div className='d-flex justify-content-center'>
              <button
                onClick={handleDelete}
                className='btn btn-danger mx-3'
              >
                Delete
              </button>
              <button  
              onClick={() => setDeletes(!deletes)}
              className='btn btn-primary mx-3'>
                Cancel
              </button>
            </div>
          </div>
              </>
            )
          }
        </div>
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
    </>
  )
}

export default DeleteRole
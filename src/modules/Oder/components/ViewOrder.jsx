import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import YourOrder from './YourOrder';
import {FiTrash} from "react-icons/fi";
const ViewOrder = () => {
  const id = useSelector((state) => state.orders.viewId); 
  const navigate = useNavigate();
  const handleBack =()=>{
    navigate(-1)
  }




  return (
    <>
    <div className='m-3'>
      <div className='d-flex justify-content-between '>
        <div>
          <h3 style={{color:'#45495c'}} className='fw-bold '>Viewing order</h3>
          
        </div>
        
        <button onClick={handleBack} className='btn text-white' style={{background:'#6c738f'}}>Back</button>
      </div>

      <div className='row mt-3'>
      <main className='p-2 border rounded-3 col-8'  style={{border:'1px solid #a5b0db' ,boxShadow: "rgba(0, 0, 0, 0.15) 1.4px 1.4px 2.2px"}}>
        <div className='d-flex justify-content-between'>
            <h3 className='fw-bold' style={{color: '#6c738f'}}>Order id {id}</h3>
        </div>

        <div className='d-flex justify-content-between my-3'>
            <h4 className='' style={{color: '#6c738f'}}>Total Amount :  </h4>
            <h4 className='text-danger'> g</h4>
        </div>
     </main>
      </div>
      

    </div>
    </>
  )
}

export default ViewOrder
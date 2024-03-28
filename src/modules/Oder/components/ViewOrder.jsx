import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import getorderid from '../core/getorderid';
const ViewOrder = () => {
  const id = useSelector((state) => state.orders.viewId); 
  const orderinfo = useSelector((state) => state.orders.clickedorder[0]);
  console.log(orderinfo)
  const navigate = useNavigate();
  const handleBack =()=>{
    navigate(-1)
  }
  const token = useSelector((state) => state.currentUser.currentUser?.token) || localStorage.getItem('token');

useEffect(()=>{
  const fetchdata = async () => {
   try {
    const response = await getorderid(token , id)
    console.log(response)
   } catch (error) {
    
   }
  }
  fetchdata();
},[])




  return (
    <>
    <div className='m-3'>
      <div className='d-flex justify-content-between '>
        <div>
          <h3 style={{color:'#45495c'}} className='fw-bold '>Viewing order</h3>
          
        </div>
        
        <button onClick={handleBack} className='btn text-white' style={{background:'#6c738f'}}>Back</button>
      </div>

      <div className='row m-3'>

      <main className='p-2  rounded-3 col-8'  style={{boxShadow: "rgba(0, 0, 0, 0.15) 1.4px 1.4px 2.2px"}}>
        <div className='d-flex justify-content-between'>
            <h3 className='fw-bold border-bottom' style={{color: '#6c738f'}}>Order id {id}</h3>
        </div>
        <section>

        </section>
     </main>


     <main className='p-2 rounded-3 col-4 ' >
        <div  style={{boxShadow: "rgba(0, 0, 0, 0.15) 1.4px 1.4px 2.2px"}} className='d-flex flex-column'>
          <h4 className='my-3 ms-4 ' style={{color: '#6c738f'}} ><span className='border-bottom'>More info</span></h4>
          <div className='ps-4 border-top border-bottom'>
          <div className='d-flex justify-content-between'> 
          <h4 className=' ' style={{color: '#6c738f'}}> <span className=''>Order by</span> </h4>
          <h4 className='pe-3 cursor-pointer' style={{color: '#6c738f'}}>edit</h4>
          </div>
            <p className='ps-3'>{orderinfo?.userEntity?.name}</p>
          </div>
          <div className='ps-4 border-top border-bottom'>
              <div className='d-flex justify-content-between'> 
               <h4 className=' ' style={{color: '#6c738f'}}> <span className=''>Table</span> </h4>
               <h4 className='pe-3 cursor-pointer' style={{color: '#6c738f'}}>edit</h4>
              </div>
            <p className='ps-3'>{orderinfo?.tableEntity?.name}</p>
          </div>
          <div className='ps-4 border-top border-bottom'>
           <h4 className=' ' style={{color: '#6c738f'}}> <span className=''>Price</span> </h4>
            <p className='ps-3'><sup className='text-danger'>$</sup>{orderinfo?.totalPrice?.toFixed(2)}</p>
          </div>
        </div>
        <section>

        </section>
     </main>
      </div>
      

    </div>
    </>
  )
}

export default ViewOrder
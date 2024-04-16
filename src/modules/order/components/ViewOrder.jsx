import React, { useEffect, useState } from 'react'
import foodimg from '../../../assets/img/dummy.png'
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegWindowClose } from "react-icons/fa";
import { MdSaveAlt } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import AddFood from './AddFood';
import { useSelector } from 'react-redux';
import useOrders from '../core/action';
import OrderedFood from './OrderedFood';
const ViewOrder = () => {
    const {viewId ,viewOrder} = useSelector((state) => state.orders) 
    const {getOrderbyId} = useOrders()
    console.log(viewOrder)
    console.log(viewOrder)

    useEffect(() => {
        getOrderbyId(viewId)
    },[viewId])

    const css = {
        boxShadow: "rgba(0, 0, 0, 0.15) 1.4px 1.4px 2.2px",
        border: '1px solid #c0c8ff', 
        height: '80px',
      };

  return (
    <>
    {/* addFood && <AddFood addmoreFood={addmoreFood} setAddmoreFood={setAddmoreFood} setAddFood={setAddFood} /> */}
   <div className='m-3 d-flex justify-content-between ' style={{background:'#09090b'}}>
   <div className='ms-1'>
          <h3 className='fw-bold text-white'>Viewing order</h3> 
        </div>
    <button  className='btn text-white custom-btn  custom-border' onClick={() => window.history.back()} >Back</button>
   </div>
    <div  className='m-3 mt-3  p-3 rounded-3 pb-5 text-white' style={{background:'#09090b'}}>

      {/* decoration here */}
      <div className=' mb-4  mt-3 d-flex justify-content-between border-bottom border-dark pb-3'>
        <div>
          <h4  className='fw-bold border-bottom border-dark text-white'>Order ID : {viewId}  </h4>
        </div>

      </div>

      <main className='row mt-3 text-white' style={{background:'#09090b'}}>
      <section style={{width:'25%'}} className=' d-flex border-end '>
         <div  className=' rounded-3 w-100 text-white '>
          <div className='p-2 rounded-3 ' >
          <div className=' p-2 border-bottom border-dark border-dark'>
             <h4  className='fw-bold text-white'>Info</h4>
             <section className='mt-3 d-flex justify-content-between'>
              <p  className='text-white'>{viewOrder?.map((item) => item.food.name)}</p>
              <p>x{viewOrder?.map((item) => item.quantity)}</p>
              <p><sup className='text-danger'>$</sup>{viewOrder?.map((item) => item.total_Price)}</p>
             </section>
          </div>
          <div className=' p-2'>
             <div className='mt-1 d-flex justify-content-between'>
              <h4  className=' text-white'>Total price</h4>
              <div>
              <span className=' me-1'><sup className='text-danger'>$</sup>
                {viewOrder[0]?.total_Price}
              </span>
              
              <span>
              </span>
              </div>
             
             </div>
          </div>
          </div>

         </div>
        </section>
        <section style={{width:'75%'}}  className=''>
          <div  className=''>
           <div className='d-flex justify-content-between mb-3'>
            <span className=' cursor-pointer'>
              <input 
              className=' form-check-input me-2 cursor-pointer' type="checkbox" name="" id="" />
              Select All
            </span>
            <div>
            <span  style={{backgroundColor:'#6c738f'}} className='btn border me-3 text-white'>
              Add Food
            </span>
            <span  className='btn border'>
              delete
             <FaRegTrashAlt className='fs-4 ms-2 cursor-pointer text-danger ' style={{ color: '#6c738f' }} />
             </span>
            </div>
           </div>
            
     {/* card */}
     {
       viewOrder?.map((item , index) => (
        <div key={index} className=' mb-3 '>
        <div className='d-flex'> 
          <span className='ms-3 me-2'>
          <input
           className=' form-check-input cursor-pointer' type="checkbox" name="" id="" />
          </span>
        <div  className='position-relative rounded-3 w-100 overflow-hidden d-flex' style={css}>
          <div className='w-25 overflow-hidden'>
            <img width={'120px'} src={item.food.food_image[0]?.url} alt='order' />
          </div>
          <main className='ms-3 d-flex flex-row mt-2 w-75 position-relative ordercardwrapper'>
            <aside style={{ width: '60%' }}>
              <h4 className='text-white'>{item.food.name}</h4>
            </aside>
            <aside style={{ width: '40%' }} className=' d-flex flex-column'>
              <div >
                <h5 className='text-white'>Price before discount <span className='ms-2 text-danger'>${item.food.price}</span></h5>
                <h5 className='text-white'>quantity ordered :  <span className='text-danger ms-2'>{item.quantity}</span></h5>
              </div>

            </aside>
          </main>
        </div>
        </div>
        
       </div>
       ))
     }
    
{/*        <h4>Newly added</h4>
      
        <div className=' mb-3 '>
      <div className='d-flex'> 
        <span className='ms-3 me-2'>
        <input

         
         className=' form-check-input cursor-pointer' type="checkbox" name="" id="" />
        </span>
      <div  className='position-relative rounded-3 w-100 overflow-hidden d-flex' style={css}>
        <div className='w-25 overflow-hidden'>
          <img width={'120px'} src={foodimg} alt='Food' />
        </div>
        <main className='ms-3 d-flex flex-row mt-2 w-75 position-relative ordercardwrapper'>
          <aside style={{ width: '60%' }}>
            <h4>coffee</h4>
            
           
          </aside>
          <aside style={{ width: '40%' }} className=' d-flex flex-column'>
            <div className=''>
              <h5>Price before discount <span className='ms-2 text-danger'>$77</span></h5>
              <p className=''>quantity ordered : <span className='text-danger ms-2'>6</span></p>
            </div>

          </aside>
        </main>
      </div>
      </div>
      
     </div> 
      */}
          </div>
        </section>

      </main>
      <div className='d-flex justify-content-end'>
       <p  style={{background:'#6c738f'}} className='btn text-white'>Save</p>
       <p  className='btn bg-danger ms-2 text-white'>Reset</p>
      </div>

      
    </div>
    </>
  )
}

export default ViewOrder
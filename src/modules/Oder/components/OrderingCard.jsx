import React from 'react'
import foodimg from '../../../assets/img/dummy.png'
import { IoAddCircleOutline } from "react-icons/io5";
const OrderingCard = ({food}) => {
    console.log(food)
  return (
    <>

    <div style={{height:'80px'}} className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-3'>
      <div className='position-relative rounded-pill overflow-hidden d-flex' style={{border:'1px solid #6c738f'}}>
        <div className='w-25'>
         <img className='img-fluid' style={{height:'80px'}} src={foodimg}  />
        </div>
        <main className='ms-3 d-flex flex-row mt-2 w-75 position-relative ordercardwrapper'>
          <aside className='w-75'>
            <h4 >{food.name}</h4>
            <p className='text-muted no-wrap'>{food.description}</p>
          </aside>
          <aside className='w-25 d-flex flex-column '>
            <div className='d-flex '>
              <h5>${food.price}.00</h5>
              <h5 className='text-danger ms-2'>-{food.discount}%</h5>
            </div>
            <div className=''>
             <button style={{background:'#6c738f'}} className='btn text-white'>Order</button>
            </div>
          </aside>
        
        </main>
      </div>
    </div>

    </>
  )
}

export default OrderingCard
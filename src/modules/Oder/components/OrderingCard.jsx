import React from 'react'
import foodimg from '../../../assets/img/dummy.png'
import { IoAddCircleOutline } from "react-icons/io5";
const OrderingCard = ({food}) => {
    console.log(food)
  return (
    <>

<div className='col-12 col-sm-12 col-md-6 col-lg-6 col-xl-4 mb-3'>
  <div className='position-relative rounded-pill overflow-hidden d-flex' style={{ border: '1px solid #6c738f', height: '80px' }}>
    <div className='w-25 overflow-hidden'>
      <img width={'120px'} src={foodimg} alt='Food' />
    </div>
    <main className='ms-3 d-flex flex-row mt-2 w-75 position-relative ordercardwrapper'>
      <aside style={{ width: '60%' }}>
        <h4>{food.name}</h4>
        <p className='text-muted w-100'>{food.description}</p>
      </aside>
      <aside style={{ width: '40%' }} className=' d-flex flex-column'>
        <div className='d-flex'>
          <h5>${food.price}.00</h5>
          <h5 className='text-danger ms-2'>-{food.discount}%</h5>
        </div>
        <div className=''>
          <button style={{ background: '#6c738f' }} className='btn text-white'>Order</button>
        </div>
      </aside>
    </main>
  </div>
</div>


    </>
  )
}

export default OrderingCard
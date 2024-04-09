import React from 'react'
import foodimg from '../../../assets/img/dummy.png'
const OrderingCard = ({food , toggleCart}) => {

  const css = {
    boxShadow: "rgba(0, 0, 0, 0.15) 1.4px 1.4px 2.2px",
    border: '1px solid #c0c8ff', 
    height: '80px',
  };



  return (
    <>

<div className=' col-sm-12 col-md-6 mb-3'>
  <div className='position-relative rounded-3 overflow-hidden d-flex' style={css}>
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
        <div className='ms-2'>
          <button onClick={()=>toggleCart(food.id)} style={{ background: '#6c738f' }} className='btn text-white'>Order</button>
        </div>
      </aside>
    </main>
  </div>
</div>


    </>
  )
}

export default OrderingCard
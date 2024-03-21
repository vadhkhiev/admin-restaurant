import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import img from '../../../assets/img/dummy.png'
import { quantity, tickedFood } from '../core/foodCartSlice'


const OrderedFood = ({handleEdit , cartFood}) => {
    const dispatch = useDispatch() 
    console.log(cartFood)

  return (
    <>
    <div className='w-100 p-2 mb-2 border rounded-3'>
        {
            cartFood?.map((food , index)=>(
                <div key={index} className='d-flex border-bottom p-2'>
                        <input 
                            checked={food.checked} 
                            onChange={() => dispatch(tickedFood(food.id))} 
                            className='form-check-input me-1' 
                            type="checkbox" 
                        />

                    <div style={{width:'33%'}}>
                        <div className='d-flex'>
                         <img className='rounded-circle' width={50} src={img} alt="" />
                         <h6 className='ms-2'>{food.name}</h6>
                        
                        </div>
                            
                    </div>
                    <div style={{width:'33%'}} className='d-flex  justify-content-end align-items-center'>
                      <span className='fw-bold pe-2  cursor-pointer' onClick={() => dispatch(quantity({ id: food.id, case: 'decrement' }))}>-</span>
                      <h6>{food.quantity}</h6>
                      <span className='fw-bold ps-2 cursor-pointer' onClick={() => dispatch(quantity({ id: food.id, case: 'increment' }))}>+</span>
                    </div>
                    <div style={{width:'33%'}} className='d-flex justify-content-end align-items-center'>
                     <h6 className='ms-2'>{food.price}</h6>
                    </div>
                </div>
            ))
        }
    </div>

    </>
  )
}

export default OrderedFood
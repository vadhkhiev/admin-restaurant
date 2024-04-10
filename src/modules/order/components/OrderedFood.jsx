import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import img from '../../../assets/img/dummy.png'
import { quantity, tickedFood } from '../core/slice'


const OrderedFood = ({handleEdit , cartFood}) => {
    const dispatch = useDispatch() 

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
                         <img className='rounded-3' width={50} src={img} alt="" />
                         <h6 className='ms-2 text-nowrap'>{food.name.length > 15 ? food.name.slice(0,15) + '...' : food.name}</h6>
                        
                        </div>
                            
                    </div>
                    <div style={{width:'33%'}} className='d-flex  justify-content-end align-items-center'>
                      <span className='fw-bold pe-2 mb-2 fs-4 cursor-pointer text-danger' onClick={() => dispatch(quantity({ id: food.id, case: 'decrement' }))}>-</span>
                      <h4>{food.quantity}</h4>
                      <span style={{color:'#6c738f'}} className='fw-bold ps-2 mb-2 fs-4 cursor-pointer ' onClick={() => dispatch(quantity({ id: food.id, case: 'increment' }))}>+</span>
                    </div>
                    <div style={{width:'33%'}} className='d-flex justify-content-end align-items-center'>
                     <h6 className='ms-2'><sup>$</sup> {(((food.price)*(1-(food.discount/100))* food.quantity ).toFixed(2))}</h6>
                    </div>
                </div>
            ))
        }
    </div>

    </>
  )
}

export default OrderedFood


// {((food.price)*(1-(food.discount/100)) ).toFixed(2)} discount price
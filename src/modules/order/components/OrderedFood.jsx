import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import img from '../../../assets/img/dummy.png'
import { quantity, tickedFood } from '../core/reducer'


const OrderedFood = ({orderedFood}) => {
    const dispatch = useDispatch()

  return (
    <>
    <div className='w-100 p-2 mb-2 border rounded-3'>
        {
            orderedFood?.map((food , index)=>(
                <div key={index} className='d-flex border-bottom p-2'>
                        <input 
                            checked={food.checked} 
                            className='form-check-input me-1' 
                            type="checkbox" 
                            onChange={()=>dispatch(tickedFood(food.id))}
                            
                        />

                    <div className='' style={{width:'33%'}}>
                        <div className='d-flex'>
                        { food.foodImageEntities[0]?.url ? (
                            <img className='rounded-3' width={50} src={food.foodImageEntities[0]?.url} alt="" />
                        ) : (
                            <img className='rounded-3' width={50} src={img} alt="No Image Found" />
                        )}
                         <h6 className='ms-2 text-white text-nowrap'>{food.name.length > 15 ? food.name.slice(0,15) + '...' : food.name}</h6>
                        
                        </div>
                            
                    </div>
                    <div  style={{width:'33%'}}  className='d-flex  text-white justify-content-end align-items-center'>
                      <span onClick={() => dispatch(quantity({ id: food.id, case: 'decrement' }))} className='fw-bold pe-2 mb-2 fs-4 cursor-pointer text-danger'>-</span>
                      <h4 className='text-white'>{food.quantity}</h4>
                      <span onClick={() => dispatch(quantity({ id: food.id, case: 'increment' }))} className='fw-bold ps-2 mb-2 fs-4 cursor-pointer text-white'>+</span>
                    </div>
                    <div style={{width:'33%'}} className='d-flex justify-content-end align-items-center'>
                     <h6 className='ms-2 text-white'><sup className='text-danger'>$</sup> {(((food.price)*(1-(food.discount/100))* food.quantity ).toFixed(2))}</h6>
                    </div>
                </div>
            ))
        }
    </div>

    </>
  )
}

export default OrderedFood



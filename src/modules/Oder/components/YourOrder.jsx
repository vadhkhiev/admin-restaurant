import React, { useState } from 'react'
import OrderedFood from './OrderedFood'
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFood, selection } from '../core/foodCartSlice';
import { FiTrash } from "react-icons/fi";

const YourOrder = () => {
    const cartFood = useSelector((state) => state.foodCart?.orderedFood)
    const dispatch = useDispatch() 
    const [edit , setEdit] = useState(false);
    const handleEdit = ()=>{
        setEdit(!edit)
    }

    const selectAll = (event)=>{
        if (event.target.checked) {
              dispatch(selection('tick'));
            } else {
              dispatch(selection('untick'));
        }
        
    }
    

    
  return (
    <>
     <main className='p-2 border rounded-3'  style={{border:'1px solid #a5b0db' ,boxShadow: "rgba(0, 0, 0, 0.15) 1.4px 1.4px 2.2px"}}>
        <div className='d-flex justify-content-between'>
            <h3 className='fw-bold' style={{color: '#6c738f'}}>Your Order</h3>
        </div>
        <section  className='my-3 d-flex justify-content-between border rounded-3 p-1 '>
            <div className='d-flex w-50'>
                <span className='w-25 text-center'>Select </span>
                <select className="form-select py-0 w-75" aria-label="Default select example">
                    <option selected>table</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div className='d-flex w-50'>
                <span className='w-25 text-center'>Select</span>
                <select className="form-select py-0 w-75 " aria-label="Default select example">
                    <option selected>payment</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>

                </select>
            </div>
        </section>
        <div className='d-flex justify-content-between'>
            <p>
                <input onChange={selectAll} className='form-check-input me-1' type="checkbox" />
                Select All
            </p>
            <FiTrash onClick={()=>dispatch(deleteFood())} className='me-2 text-danger cursor-pointer fs-4'/>
        </div>

        <section >
            <OrderedFood handleEdit={handleEdit} cartFood={cartFood}/>
        </section>
        <div className='d-flex justify-content-between my-4'>
            <h4 className='' style={{color: '#6c738f'}}>Total Amount :  </h4>
            <h4 className='text-danger'> <sup>$</sup> {cartFood?.reduce((acc, food) => acc + (food.price)*(1-(food.discount/100)) * food.quantity, 0).toFixed(2)}</h4>
        </div>
        <div>
            <button style={{background: '#6c738f'}} className='btn w-100 text-white fw-bold' >Add Order</button>
        </div>
     </main>
    </>
  )
}

export default YourOrder
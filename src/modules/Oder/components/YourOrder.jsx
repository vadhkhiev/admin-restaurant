import React, { useState } from 'react'
import OrderedFood from './OrderedFood'
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { deleteFood, selection } from '../core/foodCartSlice';
import { FiTrash } from "react-icons/fi";

const YourOrder = () => {
    const cartFood = useSelector((state) => state.foodCart?.orderedFood)
    const dispatch = useDispatch() 
    const  [selected , setSelected] = useState('')
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
     </main>
    </>
  )
}

export default YourOrder
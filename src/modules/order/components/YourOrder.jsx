import React, { useEffect, useState } from 'react'
import OrderedFood from './OrderedFood'
import { useDispatch, useSelector } from 'react-redux';
import {  deleteFood, selection } from '../core/reducer';
import { FiTrash } from "react-icons/fi";
import useOrders from '../core/action';


const YourOrder = () => {
    const {orderedFood} = useSelector((state) => state.orders)
    const { addOrder } = useOrders();
    const dispatch = useDispatch()
    const [tick , setTick] = useState(false)

    const handleAdd = async () => {
        const payload = {
            orderedFood
        }
        addOrder()
    }



    
  return (
    <>
     <main className='p-2 border rounded-3 custom-border' >
        <div className='d-flex justify-content-between'>
            <h3 className='fw-bold text-white'>Your Order</h3>
        </div>
        <section  className='my-3 d-flex justify-content-between border rounded-3 p-1 '>
            <div className='d-flex w-50'>
                <span className='w-25 text-center text-white'>Select </span>
                <select    className="form-select py-0 w-75 bg-transparent" >
                    <option disabled selected>table</option>

                </select>
            </div>
            <div className='d-flex w-50'>
                <span className='w-25 text-center text-white'>Select</span>
                <select className="form-select py-0 w-75  bg-transparent" >
                    <option hidden selected>payment</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>

                </select>
            </div>
        </section>
        
        <div className='d-flex justify-content-between'>
            <p>
                <input 
                onChange={()=>setTick(!tick)} 
                onClick={()=>dispatch(selection(tick ? 'untick' : 'tick'))} 
                className='form-check-input me-1' 
                type="checkbox" 
                checked={tick}
                />
                Select All
            </p>
            <p onClick={() => {
                dispatch(deleteFood());
                setTick(false)
            }}
            className='border p-1 rounded cursor-pointer text-white'>
            Delete
            <FiTrash  className='ms-2 text-danger  fs-4'/>
            </p>
        </div>

        <section >
         <OrderedFood  orderedFood={orderedFood}/>
        </section>
        <div className='d-flex justify-content-between my-4'>
            <h4 className='text-white' >
                Total Amount : 
            </h4>
            <h4 className='text-white'> <sup className='text-danger'>$</sup> {orderedFood.reduce((total, food)=>total+((food.price)*(1-(food.discount/100))* food.quantity ),0).toFixed(2)}</h4>
        </div>
        <div>
            <button  className='btn custom-btn custom-border w-100 text-white fw-bold' >Add Order</button>
        </div>
     </main>

    </>
  )
}

export default YourOrder

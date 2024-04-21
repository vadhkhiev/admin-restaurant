import React, { useEffect, useState } from 'react'
import OrderedFood from './OrderedFood'
import { useDispatch, useSelector } from 'react-redux';
import {  deleteFood, selection } from '../core/reducer';
import { FiTrash } from "react-icons/fi";
import useOrders from '../core/action';
import useCurrentUser from '../../profile/core/action';



const YourOrder = () => {
    const dispatch = useDispatch()
    const {orderedFood} = useSelector((state) => state.orders)
    const {tableList} = useSelector((state) => state.tableList)
    const {currentUser} = useSelector((state) => state.currentUser)
    const { addOrder } = useOrders();
    const {getCurrentUser} = useCurrentUser();
    const [tick , setTick] = useState(false)
    const [payload, setPayload] = useState({});

    useEffect(() => {
        getCurrentUser()
    }, [])
    
    useEffect(() => {
        setPayload({
            user_Id: currentUser.id,
            table_Id: null,
            items: orderedFood.map((item) => ({
                food_Id: item.id,
                quantity: item.quantity
            }))
        })
    }, [orderedFood])

    const handleAdd = async () => {
      addOrder(payload) 
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
                <select 
                    onChange={(e) => setPayload({ ...payload, table_Id: e.target.value })} 
                    className="form-select py-0 w-75 bg-transparent"
                    defaultValue="table" // Use defaultValue prop
                    >
                    <option value="table" disabled>table</option>
                    {tableList?.map((table, index) => (
                        <option key={index} value={table.id}>{table.name}</option>
                    ))}
                    </select>
            </div>
            <div className='d-flex w-50'>
                <span className='w-25 text-center text-white'>Select</span>
                <select className="form-select py-0 w-75 bg-transparent" defaultValue="payment">
                    <option value="payment" disabled>payment</option>
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
            <button onClick={handleAdd}  className='btn custom-btn custom-border w-100 text-white fw-bold' >Add Order</button>
        </div>
     </main>

    </>
  )
}

export default YourOrder

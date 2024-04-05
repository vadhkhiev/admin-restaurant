import React, { useEffect, useState } from 'react'
import OrderedFood from './OrderedFood'
import { FaRegEdit } from "react-icons/fa";
import { useDispatch, useSelector } from 'react-redux';
import { clearOrderedFood, deleteFood, selection } from '../core/foodCartSlice';
import { FiTrash } from "react-icons/fi";
import fetchTable from '../core/fetchTable';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const YourOrder = () => {
    const cartFood = useSelector((state) => state.foodCart?.orderedFood)
    const currentUser = useSelector((state) => state.currentUser?.currentUser)
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const [refetch , setRefetch] = useState(false)
    const [table , setTable ] = useState([])	
    const [tableData , setTableData] = useState({})
    const [message , setMessage] = useState('')
    const [error , setError] = useState('')
    const dispatch = useDispatch() 
    const [edit , setEdit] = useState(false);
    const navigate = useNavigate();
    const [ticked , setTicked] = useState(false)

    const [postData , setPostData] = useState({
        user_Id :currentUser?.id,
        table_Id : null,
        paymentMethod : '',
        items : 
               cartFood?.map((food)=>{
                return {
                    food_Id : food?.id,
                    quantity : food?.quantity
                }
            })
        
    })
    
    useEffect(() => {
        setPostData({
            user_Id :currentUser?.id,
            table_Id : null,
            paymentMethod : '',
            items : 
                   cartFood?.map((food)=>{
                    return {
                        food_Id : food?.id,
                        quantity : food?.quantity
                    }
            })
        })
        
    }, [cartFood])
    useEffect(() => {
        setTableData(table?.find(table => table?.id === postData?.table_Id))

        
    },[postData])
    
    console.log(postData)
    

    const handleEdit = ()=>{
        setEdit(!edit)
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetchTable(token);
                setTable(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [refetch]); 




    const selectAll = (event)=>{
        setTicked(!ticked)
        if (event.target.checked) {
              dispatch(selection('tick'));
            } else {
              dispatch(selection('untick'));
        }
        
    }

    const bookedTable = () => {
        try {
            axios.put('/api/tables/' + postData?.table_Id ,
            {
                status: 'Booked',
                name: table?.find(table => table.id === postData?.table_Id).name,
                seatCapacity: tableData?.seat_Capacity
            },
         {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
        })
            
        } catch (error) {
            console.log(error)
        }
    }

    console.log(tableData)

    const handleAdd = async () => {
        try {
            
            const response = await axios.post(
                '/api/orders',
                postData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );
            setMessage('Order placed successfully'); 
            bookedTable();
            setRefetch(!refetch)
            
             setTimeout(() => {
                setMessage('')
                dispatch(clearOrderedFood());
            }, 1000);  

        } catch (error) {
             setError(error.response.data.message);
            setTimeout(() => {
                setError('')
            }, 1000); 
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
                <select   onChange={(e)=>setPostData({...postData , table_Id : parseInt(e.target.value)})}  className="form-select py-0 w-75" aria-label="Default select example">
                    <option disabled selected>table</option>
                    {
                        table?.map((table , index)=>(
                            <option key={index} value={table.id}>{table.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className='d-flex w-50'>
                <span className='w-25 text-center'>Select</span>
                <select onChange={(e)=>setPostData({...postData , paymentMethod : e.target.value})} className="form-select py-0 w-75 " aria-label="Default select example">
                    <option disabled selected>payment</option>
                    <option value="Cash">Cash</option>
                    <option value="Bank">Bank</option>

                </select>
            </div>
        </section>
        
        <div className='d-flex justify-content-between'>
            <p>
                <input onChange={selectAll}   className='form-check-input me-1' type="checkbox" checked={ticked}/>
                Select All
            </p>
            <p className='border p-1 rounded cursor-pointer' onClick={()=>{
                dispatch(deleteFood())
                setTicked(false)
            }
            }>
            Delete
            <FiTrash  className='ms-2 text-danger  fs-4'/>
            </p>
        </div>

        <section >
            <OrderedFood handleEdit={handleEdit} cartFood={cartFood}/>
        </section>
        <div className='d-flex justify-content-between my-4'>
            <h4 className='' style={{color: '#6c738f'}}>Total Amount :  </h4>
            <h4 className='text-danger'> <sup>$</sup> {cartFood?.reduce((acc, food) => acc + (food.price)*(1-(food.discount/100)) * food.quantity, 0).toFixed(2)}</h4>
        </div>
        <div>
            <button onClick={handleAdd} style={{background: '#6c738f'}} className='btn w-100 text-white fw-bold' >Add Order</button>
        </div>
     </main>
     {
    message && (
        <div style={{position:'fixed', top:'20px', left:'50%', transform:'translateX(-50%)', zIndex:4}} className="w-25 bg-success text-white text-center p-2 rounded ">
            {message} 
        </div>
    )
}
{
    error && (
        <div style={{position:'fixed', top:'20px', left:'50%', transform:'translateX(-50%)', zIndex:4}} className="w-25 bg-danger text-white text-center p-2 rounded ">
            {error} 
        </div>
    )
}

    </>
  )
}

export default YourOrder

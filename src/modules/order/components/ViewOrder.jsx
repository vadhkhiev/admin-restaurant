import React, { useEffect, useState } from 'react';
import foodimg from '../../../assets/img/dummy.png';
import { FaRegTrashAlt } from "react-icons/fa";
import AddFood from './AddFood';
import { useDispatch, useSelector } from 'react-redux';
import useOrders from '../core/action';
import { useParams } from 'react-router-dom';
import useCurrentUser from '../../profile/core/action';
import { storeAddFoodToggle } from '../core/reducer';
import {useFoods} from '../../Food/Core/action';

const ViewOrder = () => {
    const { viewOrder , orderTableId , addFoodToggle } = useSelector((state) => state.orders);
    const {foodList} = useSelector((state) => state.foodList)
    const { getOrderbyId , updateOrder } = useOrders();
    const { currentUser } = useSelector((state) => state.currentUser);
    const [orderedItem, setOrderedItem] = useState([]);
    const [ additionalFood , setAdditionalFood ] = useState([]);
    const {getCurrentUser} = useCurrentUser();
    const dispatch = useDispatch();
    const { id } = useParams();
    const {fetchList} = useFoods ();

    useEffect(() => {
      getCurrentUser();
        if (viewOrder) {
            setOrderedItem(viewOrder);
        }
    }, [viewOrder]);

    useEffect(() => {
        if (id) {
            getOrderbyId(id);
        }
        fetchList();
    }, [id]);

    const removeItem = () => {
        setOrderedItem(orderedItem.filter((item) => !item.checked));
    }

    const selectAllItems = (selectAll) => {
        setOrderedItem(orderedItem.map((item) => ({
            ...item,
            checked: selectAll
        })));
    };

    const reset = () => {
        setOrderedItem(viewOrder);
        setAdditionalFood([]);
    }

    const handleAddtionalFood = (food) => {
        setAdditionalFood([...additionalFood, food]);
    }
    const handleSave = () => {
        const additionalPayloadItems = additionalFood.flat().map((item) => ({
            food_Id: item.id,
            quantity: item.quantity
        }));
    
        const defaultItem = orderedItem.map((item) => ({
            food_Id: foodList?.filter((i) => i.name === item.food.name)[0].id,
            quantity: item.quantity
        }));
    
        const mergedItems = [];
        const itemMap = new Map();
    
        // Merge items from additionalPayloadItems
        additionalPayloadItems.forEach(item => {
            if (itemMap.has(item.food_Id)) {
                // If item already exists, increase its quantity
                const existingItem = itemMap.get(item.food_Id);
                existingItem.quantity += item.quantity;
            } else {
                // If item doesn't exist, add it to the map and mergedItems array
                itemMap.set(item.food_Id, item);
                mergedItems.push(item);
            }
        });
    
        // Merge items from defaultItem
        defaultItem.forEach(item => {
            if (itemMap.has(item.food_Id)) {
                // If item already exists, increase its quantity
                const existingItem = itemMap.get(item.food_Id);
                existingItem.quantity += item.quantity;
            } else {
                // If item doesn't exist, add it to the map and mergedItems array
                itemMap.set(item.food_Id, item);
                mergedItems.push(item);
            }
        });
    
        const payload = {
            user_Id: currentUser.id,
            table_Id: orderTableId,
            items: mergedItems
        };
    
        updateOrder(payload, id);
        reset();
    };
    


    const css = {
        boxShadow: "rgba(0, 0, 0, 0.15) 1.4px 1.4px 2.2px",
        border: '1px solid #c0c8ff',
        height: '80px',
    };

    return (
        <>
            {addFoodToggle && <AddFood handleAddtionalFood={handleAddtionalFood}/>}
            <div className='m-3 d-flex justify-content-between ' style={{ background: '#09090b' }}>
                <div className='ms-1'>
                    <h3 className='fw-bold text-white'>Viewing order</h3>
                </div>
                <button className='btn text-white custom-btn  custom-border' onClick={() => window.history.back()} >Back</button>
            </div>
            <div className='m-3 mt-3  p-3 rounded-3 pb-5 text-white' style={{ background: '#09090b' }}>
                <div className=' mb-4  mt-3 d-flex justify-content-between border-bottom border-dark pb-3'>
                    <div>
                        <h4 className='fw-bold border-bottom border-dark text-white'>Order ID : {id}  </h4>
                    </div>
                </div>
                <main className='row mt-3 text-white' style={{ background: '#09090b' }}>
                    <section className='col-md-4 mb-3 border-end border-dark  '>
                        <div className='rounded-3 w-100 text-white'>
                            <div className='p-2 rounded-3'>
                                <div className=' p-2 border-bottom border-dark border-dark'>
                                    <h4 className='fw-bold text-white'>Info</h4>
                                    {orderedItem?.map((item, index) => (
                                        <section key={index} className='mt-3 d-flex justify-content-between'>
                                            <p>{item.food.name}</p>
                                            <p>x{item.quantity}</p>
                                            <p><sup className='text-danger'>$</sup>{item.total_Price} </p>
                                        </section>
                                    ))}
                                </div>
                                <div className=' p-2'>
                                    <div className='mt-1 d-flex justify-content-between'>
                                        <h4 className=' text-white'>Total price</h4>
                                        <div>
                                            <span className=' me-1'><sup className='text-danger'>$</sup>{orderedItem?.reduce((total, item) => total + item.total_Price, 0).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className='col-md-8'>
                        <div className=''>
                            <div className={`d-flex ${orderedItem.length > 0 ? 'justify-content-between' : 'justify-content-end'} mb-3`}>
                                {orderedItem.length > 0 &&
                                    <span className=' cursor-pointer'>
                                        <input
                                            checked={orderedItem.every(item => item.checked)}
                                            onChange={(e) => selectAllItems(e.target.checked)}
                                            className=' form-check-input me-2 cursor-pointer' type="checkbox" name="" id="" />
                                        Select All
                                    </span>
                                }
                                <div>
                                    <span
                                    onClick={()=>dispatch(storeAddFoodToggle(true))}
                                     className='btn custom-btn custom-border me-3 text-white'>
                                        Add Food
                                    </span>
                                    <span
                                        className='btn custom-border custom-btn text-white'
                                        onClick={() => removeItem(orderedItem)}
                                    >
                                        delete
                                        <FaRegTrashAlt className='fs-4 ms-2 cursor-pointer text-danger ' />
                                    </span>
                                </div>
                            </div>
                            {
                                orderedItem.length === 0 ? <p className='text-white text-center'>No Item.</p> :
                                    orderedItem?.map((item, index) => (
                                        <div key={index} className='mb-3 '>
                                            <div className='d-flex'>
                                                <span className='ms-3 me-2'>
                                                    <input
                                                        checked={item.checked}
                                                        onChange={() =>
                                                            setOrderedItem(orderedItem.map((i) =>
                                                                i.id === item.id ? { ...i, checked: !i.checked } : i
                                                            ))
                                                        }
                                                        className='form-check-input cursor-pointer'
                                                        type="checkbox"
                                                    />

                                                </span>
                                                <div className='position-relative rounded-3 w-100 overflow-hidden d-flex' style={css}>
                                                    <div className='w-25 overflow-hidden'>
                                                        <img width={'120px'} src={item.food.food_image[0]?.url || foodimg} alt='order' />
                                                    </div>
                                                    <main className='ms-3 d-flex flex-row mt-2 w-75 position-relative ordercardwrapper'>
                                                        <aside style={{ width: '60%' }}>
                                                            <h4 className='text-white'>{item.food.name}</h4>
                                                        </aside>
                                                        <aside style={{ width: '40%' }} className=' d-flex flex-column'>
                                                            <div >
                                                                <h5 className='text-white'>Price before discount <span className='ms-2 text-danger'>${item.food.price}</span></h5>
                                                                <h5 className='text-white'>quantity ordered :  <span className='text-danger ms-2'>{item.quantity}</span></h5>
                                                            </div>
                                                        </aside>
                                                    </main>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                            }
                            {
                                additionalFood.length > 0 && <div className='mb-3'>Newly Added</div>
                            }

{
    additionalFood.length > 0 &&
      additionalFood.flat().map((item, index) => (
        <div key={index} className='mb-3'>
            <div className='d-flex'>
                <span className='ms-3 me-2'>
                </span>
                <div className='position-relative rounded-3 w-100 overflow-hidden d-flex' style={css}>
                    <div className='w-25 overflow-hidden'>
                        <img width={'120px'} src={item.foodImageEntities[0]?.url || foodimg} alt='order' />
                    </div>
                    <main className='ms-3 d-flex flex-row mt-2 w-75 position-relative ordercardwrapper'>
                        <aside style={{ width: '60%' }}>
                            <h4 className='text-white'>{item.name}</h4>
                        </aside>
                        <aside style={{ width: '40%' }} className='d-flex flex-column'>
                            <div>
                                <h5 className='text-white'>Price before discount <span className='ms-2 text-danger'>${item.price}</span></h5>
                                <h5 className='text-white'>quantity ordered : <span className='text-danger ms-2'>{item.quantity}</span></h5>
                            </div>
                        </aside>
                    </main>
                </div>
            </div>
        </div>
    ))
}


                            

   
                        </div>
                    </section>
                </main>
                <div className='d-flex justify-content-end'>
                    <p onClick={() => handleSave()} className='btn text-white custom-btn custom-border'>Save</p>
                    <p onClick={() => reset()} className='btn bg-danger ms-2 text-white'>Reset</p>
                </div>
            </div>
        </>
    );
};

export default ViewOrder;

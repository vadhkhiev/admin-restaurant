import React from 'react'
import { reqAddOrder, reqOrderbyId, reqOrders } from './request'
import { useDispatch, useSelector } from 'react-redux'
import { storeOrders, storeParams, storeViewOrder } from './reducer'

const useOrders = () => {
    const dispatch = useDispatch()
    const {params } = useSelector(state => state.orders);

    const getOrders = async () => {
        await reqOrders(params).then((res)=>dispatch(storeOrders(res.data.data))).catch((err)=>console.log(err))
    }

    const getOrderbyId = async (id) => {
        try{
            const res = await reqOrderbyId(id);
            dispatch(storeViewOrder(res.data.data))
        }catch(err){
            console.log(err);
            return null;
        }
    }

    const addOrder = async (payload) => {
        await reqAddOrder(payload)
    }

    const handleFilter = (name, value) => {
        dispatch(storeParams({ [name]: value }));
    };

  return {
    getOrders,
    getOrderbyId,
    handleFilter,
    addOrder
  }
}

export default useOrders
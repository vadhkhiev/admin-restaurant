
import { reqAddOrder, reqDeleteOrder, reqOrderbyId, reqOrders, reqUpdateOrder } from './request'
import { useDispatch, useSelector } from 'react-redux'
import { clearOrderedFood, setLoading, storeOrders, storeParams, storeViewOrder } from './reducer'
import { alertConfirm, alertError, alertSuccess } from '../../utils/alert'

const useOrders = () => {
    const dispatch = useDispatch()
    const {params } = useSelector(state => state.orders);

    const getOrders = async () => {
        await reqOrders(params).then((res)=>{
            dispatch(storeOrders(res.data))
            dispatch(setLoading(false))
        }).catch((err)=>console.log(err))
    }

    const getOrderbyId = async (id) => {
        reqOrderbyId(id)
        .then(res => {
            const dataWithCheckedProp = res.data.data.map(item => ({...item, checked: false}));
            dispatch(storeViewOrder(dataWithCheckedProp))
        })
        .catch(err => {
            alertError(err.response.data.message)
            dispatch(storeViewOrder([]))
        })
    }

    const addOrder = async (payload) => {
        await reqAddOrder(payload).then((res)=>{
            alertSuccess(res.data.message)
            dispatch(clearOrderedFood())
        }).catch((err)=>alertError(err.response.data.message))
    }

    const updateOrder = async (payload, id) => {
        await reqUpdateOrder(payload, id).then((res)=>{
            alertSuccess(res.data.message)
            getOrderbyId(id)
        }).catch((err)=>alertError(err.response.data.message))
    }

    const deleteOrder = async (id) => {
        try {
            await alertConfirm(`Do you want to delete this order Id : ${id} ?`).then((result) => {
                if (result.isConfirmed) {
                    reqDeleteOrder(id).then((res) => {
                        alertSuccess("Order deleted successfully");
                        getOrders();
                    })
                } 
            });
        } catch (err) {
            await alertError(err.response.data.message);
        }
    };
    

    const handleFilter = (name, value) => {
        dispatch(storeParams({ [name]: value }));
    };

  return {
    getOrders,
    getOrderbyId,
    handleFilter,
    addOrder,
    updateOrder,
    deleteOrder
  }
}

export default useOrders
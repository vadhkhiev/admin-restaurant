import axios from "axios";


const reqOrders = async (params) => {
    return await axios.get('/api/orders', { params });
}

const reqOrderbyId = async (id) => {
    return await axios.get(`/api/orders/${id}`);
}

const reqAddOrder = async (payload) => {
    return await axios.post('/api/orders', payload);
}

export {
     reqOrders,
    reqOrderbyId,
    reqAddOrder
 }
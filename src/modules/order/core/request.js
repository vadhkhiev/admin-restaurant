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

const reqUpdateOrder = async (payload, id) => {
    return await axios.put(`/api/orders/${id}`, payload);
}

const reqDeleteOrder = async (id) => {
    return await axios.delete(`/api/orders/${id}`);
}

export {
     reqOrders,
    reqOrderbyId,
    reqAddOrder,
    reqUpdateOrder,
    reqDeleteOrder
 }
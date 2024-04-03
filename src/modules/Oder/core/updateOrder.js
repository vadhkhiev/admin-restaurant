import axios from 'axios';

const updateOrder = async (token,id, data  ) => {
  try {
    const response = await axios.put(`/api/orders/${id}`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error; 
  }
};

export default updateOrder;

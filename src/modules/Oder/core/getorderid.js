import axios from 'axios';

const getorderid = async (token , id ) => {
  try {
    const response = await axios.get(`/api/orders/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  
  }
};

export default getorderid;
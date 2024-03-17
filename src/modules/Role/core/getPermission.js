import axios from 'axios';

const getPermission = async (token , id ) => {
  try {
    const response = await axios.get(`/api/role/${id}`, {
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

export default getPermission;
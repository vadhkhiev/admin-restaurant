import axios from 'axios';

const getPermission = async (id ) => {
  try {
    const response = await axios.get(`/api/roles/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  
  }
};

export default getPermission;
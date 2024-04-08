import axios from 'axios';
const getroles = async (size='20', page='0') => {
  try {
    const response = await axios.get(`/api/roles?size=${size}&page=${page}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  
  }
};

export default getroles;


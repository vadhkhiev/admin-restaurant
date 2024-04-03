import axios from 'axios';
const getroles = async (token , size='20', page='0') => {
  try {
    const response = await axios.get(`/api/roles?size=${size}&page=${page}`, {
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

export default getroles;


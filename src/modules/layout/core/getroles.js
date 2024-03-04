import axios from 'axios';
const getroles = async (token) => {
  try {
    const response = await axios.get('/api/role', {
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


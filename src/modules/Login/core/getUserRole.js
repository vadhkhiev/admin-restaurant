import axios from 'axios';

const getUserRole = async (token , id) => {
  try {
    const response = await axios.get(`/api/user/${id}`, {
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

export default getUserRole;

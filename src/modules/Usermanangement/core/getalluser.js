import axios from 'axios';

const getalluser = async () => {
    const token = localStorage.getItem('token');
  try {
    const response = await axios.get('/api/user', {
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

export default getalluser;

import axios from 'axios';

const getAuthMeData = async (token) => {
  try {
    const response = await axios.get('https://dummyjson.com/auth/me', {
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

export default getAuthMeData;

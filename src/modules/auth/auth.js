// api.js
import axios from 'axios';

const apiUrl = 'https://dummyjson.com/auth/login';

const getAuth = async (username, password) => {
  try {
    const response = await axios.post(apiUrl, {
      username: username,
      password: password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    console.log('Response:', response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      if (error.response.status === 401) {
        console.error('Unauthorized - Invalid credentials');
      } else if (error.response.status === 403) {
        console.error('Forbidden - Insufficient permissions');
      } else {
        console.error('Unhandled HTTP error:', error.response.status);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request:', error.message);
    }
    throw error;
  }
};

export default getAuth;

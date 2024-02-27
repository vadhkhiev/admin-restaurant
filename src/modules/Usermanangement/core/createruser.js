import axios from 'axios';

const createUser = async (userData, token) => {
  const myHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`/api/user`, userData, { headers: myHeaders });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createUser };


import axios from 'axios';
const createUser = async (userData) => {

  try {
    const response = await axios.post(`/api/user`, userData);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createUser };


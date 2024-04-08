import axios from 'axios';

const getUsers = async ( page = '', role = '', query = '', sortby = '', limit = 10) => {
  try {
    const response = await axios.get('/api/user', {
      params: {
        query: query,
        page: page,
        size: limit,
        sort: sortby,
        order: 'desc',
        roleId: role
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default getUsers;

import axios from 'axios';
const getUsers = async (token ,page='',role = '',query='', sortby='' , limit=10) => {
  try {
    const response = await axios.get(`/api/user?sort=${sortby}&roleId=${role}&query=${query}&page=${page}&size= ${limit}`, {
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

export default getUsers;


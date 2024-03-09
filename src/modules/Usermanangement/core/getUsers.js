import axios from 'axios';
const getUsers = async (token ,page='',role = '',query='', sortby='' , orderby=''   , size=20) => {
  try {
    const response = await axios.get(`/api/user?sort=${sortby}&roleId=${role}&order=${orderby}&query=${query}&page=${page}&size= ${size}`, {
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


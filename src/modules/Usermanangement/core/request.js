import axios from 'axios';
const reqUsers = async (params) => {
  return await axios.get('/api/user', {
    params: {
      ...params
    }
  });
}

const createUser = async (userData) => {
  return await axios.post(`/api/user`, userData);
};

    
export { reqUsers , createUser }
import axios from 'axios';
const reqUsers = async (initparams) => {
  return await axios.get('/api/user', {
    params: {
      ...initparams
    }
  });
}

    
export { reqUsers  }
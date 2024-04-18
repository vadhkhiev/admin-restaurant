import axios from 'axios';
export const reqGetTable = async (params,token) => {
    return await axios.get('/api/tables',{params});
}
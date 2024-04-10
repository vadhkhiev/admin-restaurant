import axios from 'axios';
const reqCurrentUser = async () => {
    return await axios.get('/api/user/profile');
 }

 const postImg = async (img) => {
   return axios.post('/api/user/profile-avatar/token', img)
 }

 const editProfile = async (payload) => {
   return await axios.put(`/api/user/profile`, payload);

 }

 const changePw = async (payload) => {
   return await axios.patch('/api/user/password/reset',payload)
 }
 export { reqCurrentUser , postImg ,editProfile , changePw }
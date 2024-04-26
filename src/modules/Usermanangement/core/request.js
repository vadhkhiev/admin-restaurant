import axios from 'axios';

const reqUsers = async (params) => {
  return await axios.get('/api/user', { params });
};

const reqCreateUser = async (payload) => {
  return  await axios.post(`/api/user`, payload);
};

const reqUpdateUser = async (payload, id) => {
  return await axios.put(`/api/user/${id}`, payload);
};

const reqUploadImage = async (payload, id) => {
  return await axios.post(`/api/user/${id}/profile-avatar`, payload);
};

const reqUserbyId = async (id) => {
  return await axios.get(`/api/user/${id}`);
};

const reqDeleteUser = async (id) => {
   return await axios.delete(`/api/user/${id}`);
};
const reqChangePassword = async (payload, id) => {
  return await axios.patch(`/api/user/${id}/password`, payload);
};

export { reqUsers, reqCreateUser, reqUploadImage, reqUpdateUser, reqDeleteUser ,reqUserbyId ,reqChangePassword };

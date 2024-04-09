import axios from 'axios';

const reqUsers = async (params) => {
  return await axios.get('/api/user', { params }); ;
};

const reqCreateUser = async (payload) => {
  return  await axios.post(`/api/user`, payload);;
};

const reqUpdateUser = async (payload, id) => {
  return await axios.put(`/api/user/${id}`, payload);
};

const reqUploadImage = async (payload, id) => {
  return await axios.post(`/api/user/${id}/profile-avatar`, payload);
};

const reqDeleteUser = async (id) => {
   return await axios.delete(`/api/user/${id}`);
};

export { reqUsers, reqCreateUser, reqUploadImage, reqUpdateUser, reqDeleteUser };

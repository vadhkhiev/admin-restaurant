import  axios from "axios";

const reqRoles = async (params) => {
  return await axios.get("/api/roles", {params});
};

const reqDeleteRole = async (id) => {
  return await axios.delete(`/api/roles/${id}`);
};

const reqUpdateRole = async (id, payload) => {
  return await axios.put(`/api/roles/${id}`, payload);
}


const reqUpdatePermission = async (id, payload) => {
  return await axios.put(`/api/roles/${id}/permission`, payload);
};


export {reqRoles ,reqDeleteRole  , reqUpdatePermission , reqUpdateRole}
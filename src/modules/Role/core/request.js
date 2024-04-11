import  axios from "axios";

const reqRoles = async (params) => {
  return await axios.get("/api/roles", {params});
};

const reqRolebyId = async (id) => {
  return await axios.get(`/api/roles/${id}`);
}
const reqCreateRole = async (payload) => {
  return await axios.post("/api/roles", payload);
};

const reqDeleteRole = async (id) => {
  return await axios.delete(`/api/roles/${id}`);
};

const reqUpdateRole = async ( payload , id) => {
  return await axios.put(`/api/roles/${id}`, payload);
}


const reqUpdatePermission = async ( payload) => {
  return await axios.put(`/api/roles/permission`, payload);
};


export {reqRoles ,reqDeleteRole  , reqUpdatePermission , reqUpdateRole , reqCreateRole ,reqRolebyId}
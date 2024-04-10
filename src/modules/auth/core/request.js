import axios from "axios";
const reqGetUser = async () => {
    return await axios.get("/api/user/profile");
}

const reqRoles = async () => {
    return await axios.get("/api/roles");
}
const reqUserPermission = async (id) => {
    return await axios.get(`/api/roles/${id}`);
}
export {reqGetUser , reqUserPermission , reqRoles}
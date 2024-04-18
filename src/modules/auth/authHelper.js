import axios from "axios";

const setAuth = (value) => localStorage.setItem("token", value);

const getAuth = () => localStorage.getItem("token");

const removeAuth = () => localStorage.removeItem("token");



 const setUpAxios = () => {
   axios.defaults.baseURL = "http://13.214.207.172:6001";
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = "Bearer " + localStorage.getItem("token")
    return config;
  });
}

export { setAuth, removeAuth, getAuth, setUpAxios };

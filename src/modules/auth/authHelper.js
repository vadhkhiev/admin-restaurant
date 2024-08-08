import axios from "axios";

const setAuth = (value) => localStorage.setItem("token", value);

const getAuth = () => localStorage.getItem("token");

const removeAuth = () => localStorage.removeItem("token");



const setUpAxios = () => {
  axios.defaults.baseURL = "http://13.214.207.172:8001";

  axios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return config;
  });

  axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response && error.response.status === 401) {
        removeAuth();
        if(window.location.pathname !== "/login"){
           window.location.reload();
        }
      }
      return Promise.reject(error);
    }
  );
};

export { setAuth, removeAuth, getAuth, setUpAxios };
import axios from "axios";

const setAuth = (value) => localStorage.setItem("token", value);

const getAuth = () => localStorage.getItem("token");

const removeAuth = () => localStorage.removeItem("token");

const setUpAxios = () => {
  axios.defaults.headers.common["Authorization"] = `Bearer ${getAuth()}`;
};

export { setAuth, removeAuth, getAuth, setUpAxios };

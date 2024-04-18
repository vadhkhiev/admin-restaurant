import axios from "axios";

const reqGetFoods = async (id = "") => {
  return await axios.get(`/api/foods${id}`);
};

const reqCreateFood = async (payload) => {
  return await axios.post(`/api/foods`, payload);
};

const reqDeleteFood = async (id) => {
  return await axios.delete(`/api/foods/${id}`);
};

const reqUpdateFood = async (id, payload) => {
  return await axios.put(`/api/foods/${id}`, payload);
};

const reqGetFoodByName = async (name) => {
  return await axios.get(`api/food?query=${name}`);
};

const reqGetFoodByCategory = async (payload) => {
  return await axios.get(`api/foods/list?nameType=${payload}`);
};

export {
  reqGetFoods,
  reqGetFoodByName,
  reqCreateFood,
  reqDeleteFood,
  reqUpdateFood,
  reqGetFoodByCategory,
};

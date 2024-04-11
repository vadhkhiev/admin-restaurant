import axios from "axios";

export const reqGetCategories = async (id = "") => {
  return await axios.get(`api/categories/${id}`);
};
export const reqCreateCategory = async (payload) => {
  return await axios.post(`api/categories`, payload);
};

export const reqDeleteCategory = async (id = "") => {
  return await axios.delete(`api/categories/${id}`);
};

export const reqUpdateCategory = async (id = "", payload) => {
  return await axios.post(`api/categories/${id}`, payload);
};

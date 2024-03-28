import axios from "axios";
import { postImage } from "./postImage";
import Swal from "sweetalert2";

export const editCategory = async (newCategory, oldCategories, id, token) => {
  const myHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.put(`/api/categories/${id}`, newCategory, {
      headers: myHeaders,
    });
    if (response.status === 200) {
      Swal.fire({
        title: `Change From ${oldCategories} To ${newCategory}`,
        text: "Category Changed",
        icon: "success",
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      Swal.fire({
        title: "Failed",
        text: "Can't Add",
        icon: "failure",
      });
    }
  }
};

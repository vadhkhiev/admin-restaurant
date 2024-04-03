import axios from "axios";
import { postImage } from "./postImage";
import Swal from "sweetalert2";

const createFood = async (foodData, token) => {
  const myHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`/api/foods`, foodData, {
      headers: myHeaders,
    });
    if (response.status === 200) {
      Swal.fire({
        title: "Adding Food",
        text: "Food Added",
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

export { createFood };

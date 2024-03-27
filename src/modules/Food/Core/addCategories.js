import axios from "axios";
import Swal from "sweetalert2";

const addCategories = async (newCategories, token) => {
  const myHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
  try {
    const response = await axios.post(`/api/category`, newCategories, {
      headers: myHeaders,
    });
    if (response.status === 200) {
      Swal.fire({
        title: "Good job!",
        text: "New Categories Added",
        icon: "success",
      });
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      Swal.fire({
        title: "Failed",
        text: "Something When Wrong",
        icon: "error",
      });
    }
  }
};

export { addCategories };

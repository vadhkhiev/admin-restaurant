import axios from "axios";
import Swal from "sweetalert2";

export const deleteCategories = async (categories, token, id) => {
  console.log("====================================");
  console.log(categories + "www");
  console.log(id + "eee");
  console.log("====================================");

  try {
    if (categories === "") {
      return;
    }
    const response = await axios.delete(`/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

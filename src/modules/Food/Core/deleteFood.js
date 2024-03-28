import axios from "axios";
import Swal from "sweetalert2";

export const deleteFood = async (token, id) => {
  try {
    if ((token, id)) {
      await axios.delete(`/api/foods/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    Swal.fire({
      title: "Delete Food",
      text: "Food Removed ",
      icon: "success",
    });
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

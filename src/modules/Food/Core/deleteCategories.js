import axios from "axios";
import Swal from "sweetalert2";

export const deleteCategories = async (categories, token, id) => {
  try {
    if (categories === "") {
      return;
    }
    if ((token, id)) {
      const response = await axios.delete(`/api/categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    if (Response.status === 200) {
      Swal.fire({
        title: `Delete Categories ${categories}`,
        text: "Food Removed ",
        icon: "success",
      });
    } else {
      Swal.fire({
        title: "Can't Delete",
        text: "You try delete nothing???",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("Error deleting categories", error);
  }
};

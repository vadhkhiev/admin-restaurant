import axios from "axios";

export const deleteFood = async (token, id) => {
  try {
    if ((token, id)) {
      await axios.delete(`/api/foods/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    alert("Food Deleted");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

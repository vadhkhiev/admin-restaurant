import axios from "axios";

export const deleteFood = async (token, id) => {
  try {
    if ((token, id)) {
      await axios.delete(`/api/food/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

import axios from "axios";
const searchFoodByName = async (token, name) => {
  try {
    const response = await axios.get(`/api/foods?query=${name}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default searchFoodByName;

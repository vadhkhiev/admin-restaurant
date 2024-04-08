import axios from "axios";
const getAllFood = async (token, url = "/api/foods") => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getAllFood;

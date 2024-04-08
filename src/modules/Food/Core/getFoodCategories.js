import axios from "axios";
const getFoodCategories = async (token, url = "/api/categories") => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getFoodCategories;

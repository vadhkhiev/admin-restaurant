import axios from "axios";
const getFoodById = async (token, id) => {
  try {
    const response = await axios.get(`/api/foods/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getFoodById;

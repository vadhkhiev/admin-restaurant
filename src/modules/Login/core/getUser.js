import axios from "axios";

const checkAuth = async (token) => {
  try {
    const response = await axios.get("/api/user/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default checkAuth;

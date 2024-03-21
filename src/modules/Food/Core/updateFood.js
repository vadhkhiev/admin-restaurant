import axios from "axios";
import { useSelector } from "react-redux";

const updateFood = async (foodData, token) => {
  const myHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.put(`api/food/{foodData.id}`, foodData, {
      headers: myHeaders,
    });
    if (response.status == 200) {
      alert("Editing Success");
      return;
    }
  } catch (error) {
    if (error.response && error.response.message === 400) {
      alert("Invalid Data Entered");
    }
  }
};

export { updateFood };

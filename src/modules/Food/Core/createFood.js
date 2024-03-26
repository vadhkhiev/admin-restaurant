import axios from "axios";
import { postImage } from "./postImage";

const createFood = async (foodData, imageFile, token) => {
  const myHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`/api/food`, foodData, {
      headers: myHeaders,
    });
    if (response.status === 200) {
      alert("Food Added");

      const id = response.data;
      console.log(id);
      await postImage(id, imageFile, token);
      return response.data;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("Please Fill the Correct Information");
    }
  }
};

export { createFood };

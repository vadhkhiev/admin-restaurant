import axios from "axios";

const createFood = async (foodData, token) => {
  const myHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`/api/food`, foodData, {
      headers: myHeaders,
    });
    if (response.status === 200 || response.status === 201) {
      console.log("Success");
    } else {
      console.log("we fucked ");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createFood };

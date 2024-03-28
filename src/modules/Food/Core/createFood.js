import axios from "axios";

const createFood = async (foodData, token) => {
  const myHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(`/api/foods`, foodData, {
      headers: myHeaders,
    });
    if (response.status === 200) {
      alert("Food Added");
      return;
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("Please Fill the Correct Information");
    }
  }
};

export { createFood };

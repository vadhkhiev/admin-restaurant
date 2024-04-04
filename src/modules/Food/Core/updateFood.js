import axios from "axios";

const updateFood = async (id, foodData, token) => {
  console.log(foodData);
  const myHeaders = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.put(`api/foods/${id}`, foodData, {
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

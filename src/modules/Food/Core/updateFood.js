import axios from "axios";

const updateFood = async (id, foodData, token) => {

  try {
    const response = await axios.put(`api/foods/${id}`, foodData);
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

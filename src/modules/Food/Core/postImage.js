import axios from "axios";

const postImage = async (id, image, token) => {
  try {
    const response = await axios.post(`/api/food/Image/${id}`, image, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      alert("Added Image");
    }
  } catch (error) {
    if (error.response && error.response.status === 400) {
      alert("Bad Request");
    } else {
      alert("An error occurred while uploading the image.");
    }
  }
};

export { postImage };

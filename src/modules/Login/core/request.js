import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  "Authorization": "Basic ZzM6MTIz"
};
const reqLogin = async (username, password) => {
  try {
    const response = await axios.post('/api/auth/login', { username, password }, {
        headers: headers
    });
    return response.data;
} catch (error) {
    throw error;
}
};

export { reqLogin };



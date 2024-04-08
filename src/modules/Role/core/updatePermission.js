import axios from 'axios';

const updatePermission = async (token , id , updatedData ) => {
  try {
    const response = await axios.put(`/api/roles/permission`, {
        "role_id": id,
        "permissions": updatedData
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  
  }
};

export default updatePermission;

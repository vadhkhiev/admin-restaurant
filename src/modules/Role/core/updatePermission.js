import axios from 'axios';

const updatePermission = async (token , id , updatedData ) => {
  try {
    const response = await axios.put(`/api/roles/permission`, {
        "role_id": id,
        "permissions": updatedData
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  
  }
};

export default updatePermission;

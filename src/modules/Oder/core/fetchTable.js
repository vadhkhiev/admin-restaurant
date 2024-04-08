import axios from 'axios';

const fetchTable = async (token ) => {
  try {
    const response = await axios.get(`/api/tables?status=Available`,
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;  
  }
};

export default fetchTable;
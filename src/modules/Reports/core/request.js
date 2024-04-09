import  axios  from "axios";
const reqFoodReports = async (params) => {
   return await axios.get('/report/food', {
        params: {
            ...params
        }
    })
}

export {reqFoodReports}
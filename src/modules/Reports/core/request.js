import  axios  from "axios";
import {initParams} from '../../utils/axiosParams'
const reqFoodReports = async (params) => {
   return await axios.get('/report/food', {
        params: {
            ...initParams,
            ...params
        }
    })
}

export {reqFoodReports}
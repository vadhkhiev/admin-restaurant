import axios from "axios";

const reqSaleReport = async (params) => {
    return await axios.get('/report/staff', {
        params: {
            ...params
        }
    })
};

export{
    reqSaleReport
}
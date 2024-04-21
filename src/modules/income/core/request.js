import axios from "axios";

const reqSaleReport = async (params) => {
    return await axios.get("/api/tables", { params });
};

export{
    reqSaleReport
}
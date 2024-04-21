import { useDispatch, useSelector } from "react-redux";
import { reqSaleReport } from "./request";
import { storeSaleReportList } from "./reducer";

const useSaleReport = () => {
  const dispatch = useDispatch();
  const {saleReportList} = useSelector((state) => state.saleReportList);
  console.log(saleReportList)
  const getSaleReport = async () => {
    await reqSaleReport().then((res)=> dispatch(storeSaleReportList(res.data))).catch((err) =>console.log(err))
  }
  return {
    getSaleReport,
  }
};

export default useSaleReport;

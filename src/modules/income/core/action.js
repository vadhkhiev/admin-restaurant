import { useDispatch, useSelector } from "react-redux";
import { reqSaleReport } from "./request";
import { setLoading, storePaging, storeParams, storeSaleReportList } from "./reducer";

const useSaleReport = () => {
  const dispatch = useDispatch();
  const {params} = useSelector((state) => state.saleReportList);
  const getSaleReport = async () => {
    await reqSaleReport(params)
    .then((res)=> {
      dispatch(storeSaleReportList(res.data))
      dispatch(storePaging(res.data.paging))
      dispatch(setLoading(false))
    })
    .catch((err) =>console.log(err))
  }
  const handleFilter = (name, value) => {
    dispatch(storeParams({ [name]: value }));
  };
  return {
    getSaleReport,
    handleFilter
  }
};

export default useSaleReport;

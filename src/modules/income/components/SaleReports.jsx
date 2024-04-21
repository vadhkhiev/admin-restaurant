import React, { useEffect } from "react";
import useSaleReport from "../core/action";
const SaleReports = () => {
  const {getSaleReport} = useSaleReport()
  useEffect(() => {
    getSaleReport()
  },[])
  return (
    <>
    <h3 className="text-white mb-3 fw-bold">Sale Reports</h3>
      <div className=" custom-border rounded-3 p-3">
        
      </div>
    </>
  );
};

export default SaleReports;

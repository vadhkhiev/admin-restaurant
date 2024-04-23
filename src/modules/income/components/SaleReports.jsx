import React, { useEffect } from "react";
import useSaleReport from "../core/action";
import { useSelector } from "react-redux";
import Pagination from "../../utils/components/Pagination";
import Reset from "../../utils/components/Reset";
import loadingImg from '../../../assets/img/loading.gif';
import Filter from "../../utils/components/Filter";
const SaleReports = () => {
  const {getSaleReport, handleFilter} = useSaleReport()
  const {saleReportList,params,pagingdetails,loading} = useSelector((state)=> state.saleReportList)
  useEffect(() => {
    getSaleReport()
  },[params])
  const collectParam = (key, value) => {
    const formattedValue = (key === 'start' || key === 'end') ? value.replace(/-/g, ':') : value;
    handleFilter(key, formattedValue);
  };
  return (
    <>
      <div style={{ height: '35px' }} className='d-flex justify-content-between mb-3'>
          <div>
            <h3 className="text-white mb-3 fw-bold">Sale Reports</h3>
          </div>
          <div className='d-flex justify-content-end'>
            <div style={{ height: '35px' }} className='rounded-start-3 d-flex justify-content-center'>
              <Reset params={params} handleFilter={handleFilter}/>
              <input
                onChange={(e) => {
                  collectParam('query', e.target.value);
                }}
                value={params.query}                
                className='custom-border ms-2 ps-3 text-white rounded-3 bg-transparent' placeholder="Search" />
            </div>
            <div className="p-0 d-flex">
              <Filter handleFilter={handleFilter} params={params} action="order" options={["asc", "desc"]} />
            </div>
            <div style={{ height: '35px' }} className={`ms-2 custom-border rounded-3 d-flex p-2 px-3`}>
              <div className='d-flex text-nowrap'>
                <label className='text-white me-3' htmlFor="">Start date</label>
                <input
                  onChange={(e) => collectParam('start', e.target.value)}
                  className='form-control py-0 rounded me-3' type="date" name="" id=""
                />
              </div>
              <div className='d-flex text-nowrap '>
                <label className='text-white me-3' htmlFor="">End date</label>
                <input
                  onChange={(e) => collectParam('end', e.target.value)}
                  className='form-control py-0 rounded' type="date" name="" id="" />
              </div>
            </div>
        </div>        
      </div>
      {loading ?(
        <div className="d-flex justify-content-center align-items-center my-3">
          <img width={20} src={loadingImg} alt="" />
        </div>    
        ):(
          <>
            <div className="custom-border mt-3 rounded-3">
              <table className="table rounded table-borderless">
                <thead className="border-bottom border-dark">
                  <tr>
                    <th scope="col" className="text-white">Name</th>
                    <th scope="col" className="text-white">Username</th>
                    <th scope="col" className="text-white">TotalPrice</th>
                  </tr>
                </thead>
                <tbody className="">
                  {saleReportList.length > 0 ? (
                    saleReportList.map((SaleReports, index) => (
                      <tr key={index} className="hover-effect">
                        <td className="text-white">{SaleReports.cashier.name}</td>
                        <td className="text-white">{SaleReports.cashier.username}</td>
                        <td className="text-white"><sup className="text-danger">$</sup>{SaleReports.totalPrice.toFixed(2)}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="text-center text-white">
                        No Result.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination params={params} handleFilter={handleFilter} pagingdetails={pagingdetails}/>
          </>
        )
      }
    </>
  );
};

export default SaleReports;

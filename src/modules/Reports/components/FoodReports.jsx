import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import loadingImg from '../../../assets/img/loading.gif';
import useReports from '../core/action';
import Pagination from '../../utils/components/Pagination';
import Reset from '../../utils/components/Reset';

const FoodReports = () => {
  const { foodReports, params, pagingdetails, loading } = useSelector(state => state.foodReports);
  const { fetchFoodReports, handleFilter } = useReports();

  useEffect(() => {
    fetchFoodReports();
  }, []);

  const collectParam = (key, value) => {
    const formattedValue = (key === 'start' || key === 'end') ? value.replace(/-/g, ':') : value;
    handleFilter(key, formattedValue);
  };

  return (
    <>
      <div className='mx-3 p-3 custom-border rounded-3'>
        {/* start of div */}
        <div style={{ height: '35px' }} className='d-flex justify-content-between mb-3'>
          <div>
            <h3 className='fw-bold mb-3 text-white'>Food Report <span className='text-primary fs-5'>
              {`${(!(params.start) || !(params.end)) ? '(This Month)' : '' }`}</span></h3>
          </div>
          <div className='d-flex justify-content-end'>
            <div style={{ height: '35px' }} className='rounded-start-3 d-flex justify-content-center'>
              <Reset params={params} handleFilter={handleFilter} />
              <input
                onChange={(e) => {
                    collectParam('query', e.target.value);
                }}
                value={params.query}
                 className='custom-border ms-2 ps-3 text-white rounded-3 bg-transparent' placeholder="Search" />
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
        {loading ? (
          /* start of loading screen */
          <div className="d-flex justify-content-center align-items-center my-3">
            <img width={20} src={loadingImg} alt="" />
          </div>
        ) : (
          <>
          <div className='custom-border rounded-3'>
          <table className='table  table-borderless '>
              <thead>
                <tr className='border-bottom border-dark'>
                  <th scope='col' className='text-white'>ID</th>
                  <th scope='col' className='text-white'>Food Name</th>
                  <th scope='col' className='text-white'>Price per Unit</th>
                  <th scope='col' className='text-white'>Quantity Sold</th>
                  <th scope='col' className='text-white'>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {foodReports && foodReports.length > 0 ? (
                  <>
                    {foodReports.map((report, index) => (
                      <tr key={index} className='hover-effect'>
                        <td className='text-white'>{report?.food?.id}</td>
                        <td className='text-white'>{report?.food?.name}</td>
                        <td className='text-white'><sup className='text-danger'>$</sup>{(report?.unitPrice).toFixed(2)}</td>
                        <td className='text-white'>{report?.totalQuantitySold} unit</td>
                        <td className='text-white'>
                          <sup className='text-danger'>$</sup>{(report?.totalPrice).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </>
                ) : (
                  <tr>
                    <td className="text-center text-white" colSpan="5">No Result.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

            <Pagination params={params} handleFilter={handleFilter} pagingdetails={pagingdetails} />
          </>
        )}
      </div>
    </>
  );
}

export default FoodReports;

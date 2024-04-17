import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
const SaleReports = () => {
  const [sale, setSale] = useState([]);
  const [paging, setPaging] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token"); 
    //Search
    const [query, setQuery] = useState("");
    //Show
    const [limit, setLimit] = useState(20);
    const limitOptions = [10, 20, 30, 40, 50];
    // sort
    const [sortValue, setSortValue] = useState("");
    const sortOptions = ["asc", "desc"];
    //pagination
    const [page, setPage] = useState(1);

    const handlePageNext = () => {
      if (page < paging.totalPage) {
        setPage(page + 1);
        window.scrollTo(0, 0);
      }
    };

    const handlePagePrev = () => {
      if (page === 1) {
        setPage(page);
      } else {
        setPage(page - 1);
        window.scrollTo(0, 0);
      }
    };
  useEffect(() =>{
    if(startDate === '' || endDate ===''){
      return;
    }    
    setStartDate(startDate.replace(/-/g, ":"))
    setEndDate(endDate.replace(/-/g, ":"))
  },[startDate,endDate])
  useEffect(() => {
    axios
      .get(`/report/staff?query=${query}&order=${sortValue}&size=${limit}&page=${page}&${startDate ? 'start=' + startDate : ''}${endDate ? '&end=' + endDate : ''}`)
      .then((res) => {
        setSale(res.data.data);
        setPaging(res.data.paging);
      })
      .catch((err) => console.log(err));
  }, [token,startDate,endDate, query, sortValue,limit,page]);
  return (
    <>
      <div className="container d-flex justify-content-between px-0 py-2">
          <div className="d-flex align-item-enter p-0">
            <span className="fw-bold mt-2">Start Date:</span>
              <input
                className="rounded-3 border-0 px-2 mx-1"
                type="date"
                name="startDate"
                value={useParams.start}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <span className="fw-bold mt-2">End Date:</span>
              <input
                className="ms-1 rounded-3 border-0 px-2 mx-1"
                type="date"
                name="endDate"
                value={useParams.end}
                onChange={(e) => setEndDate(e.target.value)}
              />
          </div>
          <div className="d-flex">
            <input
              className="rounded-3 py-0 ps-2 pe-4 mx-2 border-0 fs-5 "
              type="text"
              placeholder="Search"
              onChange={(e) => setQuery(e.target.value)}
            />
            <select
              className="py-2 border-0 rounded-3 w-100"
              onChange={(e) => setSortValue(e.target.value)}
              value={sortValue}
            >
              <option value="">Sort by</option>
              {sortOptions.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
            <select
              className="py-2 pe-0 px-0 ms-2 border-0 rounded-3 w-125"
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
            >
              {limitOptions.map((item, index) => (
                <option value={item} key={index}>
                  Show {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="container mt-3 p-0">
          <table className="table bg-white">
            <thead>
              <tr>
                <th scope="col">Staff</th>
                <th scope="col" className="text-center">
                  TotalPrice
                </th>
              </tr>
            </thead>
            <tbody>
              {sale.map((sales, index) => (
                <tr key={index}>
                  <td>{sales.cashier?.name}</td>

                  <td className="text-center text-danger">
                    $ {sales.totalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center text-primary">
          <span className="page-item fs-2 " onClick={handlePagePrev}>
            &laquo;
          </span>
          <span className="mt-2 mx-4" style={{ fontSize: "18px" }}>
            {page}/{paging.totalPage}
          </span>
          <span className="page-item fs-2" onClick={handlePageNext}>
            &raquo;
          </span>
        </div>
    </>
  );
};

export default SaleReports;

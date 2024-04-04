import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
const SaleReports = () => {
  const [sale, setSale] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paging, setPaging] = useState({});
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [staffTop,setStaffTop] = useState(null);
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
    const handleTop = () =>{
      const valueTop = "top";
      setStaffTop(valueTop);
      console.log(staffTop)
    }
  useEffect(() =>{
    if(startDate === '' || endDate ===''){
      return;
    }    
    setStartDate(startDate.replace(/-/g, ":"))
    setEndDate(endDate.replace(/-/g, ":"))
  },[startDate,endDate])
  useEffect(() => {
    axios
      .get(`/report/staff?staffTop5=${staffTop}&query=${query}&order=${sortValue}&size=${limit}&page=${page}&${startDate ? 'start=' + startDate : ''}${endDate ? '&end=' + endDate : ''}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setSale(res.data.data);
        setPaging(res.data.paging);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [token,startDate,endDate, query, sortValue,limit,page]);
  return (
    <>
          <div className="container  d-flex align-item-center justify-content-end  p-0">
            <button 
              className="btn btn-danger p-0 px-3 me-2"
              onClick={handleTop}
            >
              Top 5
            </button>
            <div className=" d-flex align-item-enter px-0">
              <input
                className="me-1 rounded-3 border-0 p-1 px-3"
                type="date"
                name="startDate"
                onChange={(e) => setStartDate(e.target.value)}
              />
              <input
                className="ms-1 rounded-3 border-0 p-0 px-3"
                type="date"
                name="endDate"
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>
                        <input
                          className="rounded-3 py-0 ps-2 pe-4 mx-2 border-0 fs-5 "
                          type="text"
                          placeholder="Search"
                          onChange={(e) => setQuery(e.target.value)}
                        />
                        <div className="d-flex me-2">
                          <select
                            className="ps-1 pe-3 py-2 border-0 rounded-3 w-100"
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
                        </div>
                        <div className="d-flex me-2">
                          <select
                            className="ps-1 py-2 border-0 rounded-3 w-100"
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
                <td>{sales.userEntity.name}</td>
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

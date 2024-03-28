import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CreateTable from "./components/CreateTable";

const Table = () => {
  const [tableList, setTableList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [paging, setPaging] = useState({});
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const [modal, setModal] = useState(false);
  const [query, setQuery] = useState("");
  //Show
  const [limit,setLimit] = useState(20);
  const limitOptions = [10,20,30,40,50];
  // sort
  const [sortValue, setSortValue] = useState("");
  const sortOptions = ["asc", "dasc"];
  // filter
  // const [filterValue, setFilterValue] = useState("");
  // const filterOptions = ["Available", "Booked"];
  //pagination
  const [page, setPage] = useState(1);

  console.log(paging);

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

  useEffect(() => {
    // if(query.length === 0 || query.length > 2){
    axios
      .get(
        `/api/tables?order=${sortValue}&query=${query}&size=${limit}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setTableList(res.data.data);
        setRefresh(true);
        setPaging(res.data.paging);
      })
      .catch((err) => console.log(err));
    // }
  }, [token, refresh,query, sortValue, page, limit]);

  function toggleModal() {
    setModal(!modal);
  }

  // function for delete
  const handleDelete = (id) => {
    const confirm = window.confirm("Are You Sure to delete?");
    if (confirm) {
      axios
        .delete(`/api/tables/${id}` ,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {modal && <CreateTable toggleModal={toggleModal} />}
      <div>
        <div className="d-flex justify-content-end me-5 mt-3">
          <p className="mb-0">Total Table: <span className="text-danger">{paging.totals}</span></p>
        </div>
        <div className="container mt-3">
          <div className="row">
            <div className="col-4 d-flex ">
              <span className="fw-bold fs-2 text-dark me-3">Table List</span>
              <button
                className="btn btn-primary fs-4 fw-bold px-3"
                onClick={toggleModal}
              >
                Create
              </button>
            </div>
            <div className="col-8 d-flex align-item-center justify-content-end ">
              <input
                className="rounded-3 py-2 ps-3 pe-4 mx-2 border-0 fs-4"
                type="text"
                placeholder="Search"
                onChange={(e) => setQuery(e.target.value)}
              />
              <div className="d-flex me-2">
                {/* <h5 className="">Sort By: </h5> */}
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
              {/* <h5>Filter By: </h5> */}
              {/* <div className="d-flex me-2">
                <select
                  className="ps-1 py-2 border-0 rounded-3 w-100"
                  onChange={(e) => setFilterValue(e.target.value)}
                  value={filterValue}
                >
                  <option value="">Filter by</option>
                  {filterOptions.map((item, index) => (
                    <option value={item} key={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div> */}
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
          </div>
        </div>
        <div className="container mt-3">
          <table className="table bg-white">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
                <th scope="col">SeatCapacity</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableList.map((tables) => (
                <tr key={tables.id}>
                  <td>{tables.id}</td>
                  <td>{tables.name}</td>
                  <td
                    className={`${
                      tables.status === "Available"
                        ? "text-success"
                        : "text-danger"
                    }`}
                  >
                    {tables.status}
                  </td>
                  <td>{tables.seatCapacity}</td>
                  <td className="d-flex gap-2 justify-content-center">
                    <button className="btn btn-success" >Update</button>
                    <button
                      className="btn btn-danger"
                      onClick={(e) => handleDelete(tables.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="d-flex justify-content-center align-item-center mb-3">
          <button className="btn btn-danger me-2" onClick={handlePagePrev}>
            Prev
          </button>
          <span className="fw-bold fs-4">{page}/{paging.totalPage}</span>
          <button className="btn btn-primary ms-2" onClick={handlePageNext}>
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Table;

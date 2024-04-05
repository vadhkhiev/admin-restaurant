import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CreateTable from "./components/CreateTable";
import UpdateTable from "./components/UpdateTable";

const Table = () => {
  const [tableList, setTableList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [paging, setPaging] = useState({});
  const [loading, setLoading] = useState(true);
  const token =
    useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const [create, setCreate] = useState(false);
  const [update, setUpdate] = useState(false);
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
  const [pid, setPid] = useState(null);

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
        setPaging(res.data.paging);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, [token, query, sortValue, page, limit, refresh]);

  function Create() {
    setCreate(!create);
  }
  function Update(id) {
    setPid(id);
    setUpdate(!update);
  }
  // function for delete
  const handleDelete = (id) => {
    const confirm = window.confirm("Are You Sure to delete?");
    if (confirm) {
      axios
        .delete(`/api/tables/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRefresh(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {loading ? (
        <div className="d-flex flex-row justify-content-center align-items-center">
          <h4 className="mt-5">Loading...</h4>
        </div>
      ) : (
        <>
          {create && (
            <CreateTable
              refresh={refresh}
              setCreate={setCreate}
              setRefresh={setRefresh}
              Create={Create}
            />
          )}
          {update && (
            <UpdateTable
              refresh={refresh}
              setUpdate={setUpdate}
              setRefresh={setRefresh}
              Update={Update}
              pid={pid}
            />
          )}
          <div>
            <div className="container mt-3">
              <div className="d-flex justify-content-end mt-3">
                <p className="mb-0">
                  Total Table:{" "}
                  <span className="text-danger">{paging.totals}</span>
                </p>
              </div>
            </div>
            <div className="container mt-3">
              <div className="row">
                <div className="col-4 d-flex ps-1">
                  <span className="fw-bold fs-2 text-dark me-3">
                    Table List
                  </span>
                  <button
                    style={{ background: "#6c738f" }}
                    className="btn text-white  fs-4  px-3 "
                    onClick={Create}
                  >
                    Create
                  </button>
                </div>
                <div className="col-8 d-flex align-item-center justify-content-end p-0">
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
              </div>
            </div>
            {tableList.length > 0 ? (
              <>
                <div className="container mt-3 p-0">
                  <table className="table bg-white">
                    <thead>
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th className="text-center" scope="col">
                          SeatCapacity
                        </th>
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
                          <td className="text-center">{tables.seat_Capacity}</td>
                          <td className="d-flex gap-2 justify-content-center">
                            <button
                              style={{ background: "#6c738f" }}
                              className="btn btn-success p-1"
                              onClick={() => Update(tables.id)}
                            >
                              {" "}
                              Update
                            </button>
                            <button
                              className="btn btn-danger p-1"
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
            ) : (
              <p className="text-center fs-3 fw-bold text-danger">
                Table Not Found.
              </p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Table;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateTable from "./CreateTable";
import UpdateTable from "./UpdateTable";
import { GoTrash } from "react-icons/go";
import { PiNotePencilThin } from "react-icons/pi";
import useTable from "../core/action";
import Pagination from '../../utils/components/Pagination'
import SearchBar from "../../utils/components/SearchBar";
import Reset from "../../utils/components/Reset";
import { storeCreateToggle, storeUpdate, storeUpdateToggle} from "../core/reducer";
import Filter from "../../utils/components/Filter";
import LoadingImg from "../../../assets/img/loading.gif";

const Table = () => {
  const {tableList, paging, params, createToggle, updateToggle, loading} = useSelector((state) => state.tableList);
  const {getTableList, handleFilter, deleteTable} = useTable();
  const dispatch = useDispatch();

  useEffect(() => {
    getTableList();
  }, [params]);

  const handleDelete = (id) => {
    deleteTable(id);
  };

 

  return (
    <>
      {createToggle && (
        <CreateTable />
      )}
      {updateToggle && (
        <UpdateTable />
      )}
      {loading ? (
        <div style={{ height: '80vh' }} className="d-flex justify-content-center align-items-center">
          <img width={40} src={LoadingImg} alt="" />
        </div>
      ) : (
        <div className="m-3 custom-border rounded-3 p-3">
          <div>
            <div className="ps-1">
              <h2 className="fw-bold text-white me-3">
                Table List
              </h2>
              <p className="text-white-50">Here is the list of tables</p>
              <div className="d-flex justify-content-between">
                <div className="d-flex">
                  <SearchBar handleFilter={handleFilter} params={params} />
                  <div className="p-0 d-flex">
                    <Filter handleFilter={handleFilter} params={params} action="status" options={["Available", "Booked"]} />
                    <Filter handleFilter={handleFilter} params={params} action="order" options={["asc", "desc"]} />
                  </div>
                  <Reset handleFilter={handleFilter} params={params} />
                </div>
                <button
                  className="btn custom-btn text-white custom-border ms-2"
                  onClick={() => dispatch(storeCreateToggle(true))}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
          <div className="custom-border mt-3 rounded-3">
            <table className="table rounded table-borderless">
              <thead className="border-bottom border-dark">
                <tr>
                  <th scope="col" className="text-white">ID</th>
                  <th scope="col" className="text-white">Name</th>
                  <th scope="col" className="text-white">Status</th>
                  <th scope="col" className="text-white">SeatCapacity</th>
                  <th scope="col" className="text-white">Action</th>
                </tr>
              </thead>
              <tbody className="">
                {tableList.length > 0 ? (
                  tableList.map((tables) => (
                    <tr key={tables.id} className="hover-effect">
                      <td className="text-white">{tables.id}</td>
                      <td className="text-white">{tables.name}</td>
                      <td
                        className="text-white"
                        
                      >
                        <span className="px-2 rounded-pill" style={{background: tables.status === "Available" ? "#086355" : "#7f1f1f"}}>{tables.status}</span>
                      </td>
                      <td className="text-white">{tables.seat_Capacity}</td>
                      <td>
                        <PiNotePencilThin
                          className="text-white fs-4 me-2"
                          onClick={() => {
                            dispatch(storeUpdate(tables));
                            dispatch(storeUpdateToggle(true));
                          }}
                        />
                        <GoTrash
                          onClick={(e) => handleDelete(tables.id)}
                          className="text-danger fs-4"
                        />
                      </td>
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
          <Pagination pagingdetails={paging} params={params} handleFilter={handleFilter} />
        </div>
      )}
    </>
  );
};

export default Table;

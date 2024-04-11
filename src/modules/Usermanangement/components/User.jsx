import React, { useEffect, useState } from "react";
import Table from "./Table";
import EditUser from "./EditUser";
import CreateUser from "./CreateUser";
import Filterbar from "./Filterbar";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import useUsers from "../core/action";
import { useSelector } from "react-redux";

const User = () => {
  const { users , params } = useSelector((state) => state.users);
  const pagingdetails = useSelector((state) =>state.users.paging)
  const {userPermission} = useSelector((state) => state.auth);
  const roles = useSelector((state) => state.roles.roles);
  const { getUsers , setParams } = useUsers();
  const [edit, setEdit] = useState(false);

  const [editUser, setEditUser] = useState({});
  const [create, setCreate] = useState(false);
  const [filter , setFilter] = useState(false) 




  useEffect(() => {
    getUsers()
  }, [params]);

  const collectParams = (e) => {
    const value = e.target.value
    const name = e.target.name
    setParams( {...params,[name] : value})
  }


  const handleEdit = (editid) => {
    if (editid === 1) {
      return
    } else {
      setEdit(!edit);
      setEditUser(users.find((user) => user.id === editid));
    }
  };
  const handleCreate = () => {
    setCreate(true);
  };

  //pagination
  const handlePage = (para) => {
    window.scrollTo(0, 0);
    const newPage = para === "increase" ? params.page + 1 : params.page - 1;
    if (newPage >= 1 && newPage <= pagingdetails?.totalPage) {
      setParams({ ...params, page: newPage });
    }
  };

  return (
    <>
      {/* Modal */}

      {edit && (
        <>
          <EditUser
            handleEdit={handleEdit}
            editUser={editUser}
            setEdit={setEdit}
            edit={edit}
          />
        </>
      )}
      {create && (
        <>
          <CreateUser
            setCreate={setCreate}
          />
        </>
      )}

      {/* End of Modal */}

      <div className="container rounded  my-1">
      
          <div>
            <div className="p-4 px-3 d-flex justify-content-between">
              <span
                style={{
                  boxShadow:
                    "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
                }}
                className="fw-bold p-2 rounded-3"
              >
                <span
                  className={`me-3 cursor-pointer p-2 ${
                    params.roleId === "" ? "borderbottom" : ""
                  }`}
                  onClick={() => setParams({ ...params, roleId: "" })}
                >
                  All <BsPeople className="mb-1" />
                </span>
                <span
                  className={`p-2 cursor-pointer ${
                    params.roleId === 1 ? "borderbottom" : ""
                  }`}
                  onClick={() => setParams({ ...params, roleId: 1 , page: 1 })}
                >
                  Admin <MdOutlineAdminPanelSettings />
                </span>
              </span>
              <div>
                <p className="">
                  Total{" "}
                  : {pagingdetails.totals}
                </p>
              </div>
            </div>

            <div className="pt-3 ps-3 d-flex justify-content-between row">
              <div className="d-flex col-2">
                <h3
                  style={{ color: "#45495c" }}
                  className="fw-bold d-flex align-items-center me-3"
                >
                  Members
                </h3>
                {userPermission?.find((per) => per.name == "create-user")
                  ?.status === 1 && (
                  <>
                    <button
                      onClick={handleCreate}
                      style={{ backgroundColor: "#6c738f" }}
                      className="btn text-white fw-bold"
                    >
                      Add
                    </button>
                  </>
                )}
              </div>

              {/* search and filter */}

              <div className={`col-sm-12 col-md-10 d-flex justify-content-end`}>
                <div
                  style={{ transition: "all 0.3s" }}
                  className={`d-flex ${
                    filter ? "col-12" : "col-4"
                  } justify-content-end me-3`}
                >
                  <div className="d-flex">
                    <div className="w-75">
                      <input
                        type="text"
                        className="form-control p-2 w-100"
                        placeholder="Search user..."
                        name="query"
                        onChange={(e) => {
                          const timeoutId = setTimeout(
                            () => collectParams(e),
                            500
                          );
                          return () => clearTimeout(timeoutId);
                        }}
                      />
                    </div>
                    <div
                      className="rounded-start d-flex "
                      style={{ background: "#6c738f" }}
                    >
                      <button
                        onClick={() => setFilter(!filter)}
                        style={{ backgroundColor: "#6c738f" }}
                        className="btn text-white fw-bold  text-nowrap"
                      >
                        {" "}
                        {`${filter ? ">" : "<"} Filter`}
                      </button>
                    </div>
                  </div>
                  <div
                    style={{ background: "#6c738f" }}
                    className={`d-flex align-items-center ${
                      filter ? "col-8" : ""
                    }`}
                  >
                    {filter && (
                      <Filterbar
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {users.length > 0 ? (
              <div className="p-3">
                <Table
                  handleEdit={handleEdit}
                  users={users}
                />{" "}
                
              </div>
            ) : (
              <div className="p-3">
                <p className="text-center text-danger">No users found</p>
              </div>
            )}

            {/* pagination */}

            {users.length > 0 && (
              <div className="p-0 d-flex justify-content-center">
                <nav aria-label="Page navigation example">
                  <ul className="pagination list-unstyled d-flex justify-content-center align-items-center">
                    <li className="page-item underline-none me-4">
                      <a
                         onClick={() => handlePage("decrease")} 
                        style={{ fontSize: "25px" }}
                        className="page-link"
                        aria-label="Previous"
                      >
                        <span aria-hidden="true">&laquo;</span>
                      </a>
                    </li>
                    <li
                      className="page-item underline-none"
                      style={{ display: "flex", gap: "5px", width: "60px" }}
                    >
                      <span className="page-link" style={{ fontSize: "18px" }}>
                        {params?.page}
                      </span>
                      <span className="page-link" style={{ fontSize: "18px" }}>
                        /
                      </span>
                      <span className="page-link" style={{ fontSize: "18px" }}>
                        {pagingdetails?.totalPage}
                      </span>
                    </li>
                    <li className="page-item">
                      <a
                         onClick={() => handlePage("increase")} 
                        style={{ fontSize: "25px" }}
                        className="page-link"
                        aria-label="Next"
                      >
                        <span aria-hidden="true">&raquo;</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        
      </div>
    </>
  );
};

export default User;

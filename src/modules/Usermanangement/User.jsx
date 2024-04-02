import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import getusers from "./core/getUsers";
import loadingImg from "../../assets/img/loading.gif";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { storeUsers } from "./core/allusersSlice";
import Confirm from "./components/Confirm";
import EditUser from "./components/EditUser";
import CreateUser from "./components/CreateUser";
import Filterbar from "./components/Filterbar";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsPeople } from "react-icons/bs";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState("");
  const [selectRole, setSelectRole] = useState("");
  const [edit, setEdit] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [create, setCreate] = useState(false);
  //filtering
  const [pagingdetails, setPagingdetails] = useState({});
  const [query , setQuery] = useState('')
  const [sortby , setSortby] = useState('')
  const [currpage , setCurrpage] = useState(1)
  const [orderby , setOrderby] = useState('')
  const [limit , setLimit] = useState(20)
  const [filter , setFilter] = useState(false)
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');  
  const roles = useSelector((state) => state.roles.roles);
  const dispatch = useDispatch();
  //permission
  const permission = useSelector((state) => state.permission?.permission?.data?.permissions);



  //solved no user when we make change on other pages > 1

  useEffect(() => {
    setCurrpage(1);
  }, [limit, selectRole]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getusers(
          token,
          currpage,
          selectRole,
          query,
          sortby,
          limit
        );
        dispatch(storeUsers(result.data));
        setUsers(result.data);
        setPagingdetails(result.paging);
        setLoading(false);
      } catch (error) {
        console.error("Error in component:", error);
      }
    };
    fetchData();
  }, [selectRole, edit, refresh, currpage, query, sortby, limit]);

  const handleDelete = (user) => {
    if (user.id === 1) {
      alert(
        `You can not delete Admin Account : \u{1F621}\u{1F621}\u{1F621}\u{1F621}\u{1F621}`
      );
      return;
    }
    setConfirm(user);
  };

  const confirmDelete = async () => {
    try {
      if (token && confirm) {
        const id = confirm.id;
        await axios.delete(`/api/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // Update the user list after deletion
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    } finally {
      // Close the confirm/modal after deletion
      setConfirm("");
    }
  };

  const cancelDelete = () => {
    setConfirm("");
  };
  const handleEdit = (editid) => {
    if (editid === 1) {
      alert(
        `You can not edit Admin Account : \u{1F621}\u{1F621}\u{1F621}\u{1F621}\u{1F621}`
      );
    } else {
      setEdit(!edit);
      setEditUser(users.find((user) => user.id === editid));
    }
  };
  const handleCreate = () => {
    setCreate(true);
  };
  const handlePagination = (paging) => {
    window.scrollTo(0, 0);
    if (paging === "increase") {
      setCurrpage(
        pagingdetails.totalPage === currpage ? currpage : currpage + 1
      );
    } else {
      setCurrpage(currpage === 1 ? 1 : currpage - 1);
    }
  }

  return (
    <>
      {/* Modal */}
      {confirm && (
        <Confirm
          confirmDelete={confirmDelete}
          confirm={confirm}
          cancelDelete={cancelDelete}
        />
      )}

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
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </>
      )}

      {/* End of Modal */}

      <div className="container rounded  my-1">
        {loading ? (
          <div className="d-flex flex-row justify-content-center align-items-center">
            <h4>Loading...</h4>
            <span>
              <img src={loadingImg} width={20} alt="" />
            </span>
          </div>
        ) : (
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
                    selectRole === "" ? "borderbottom" : ""
                  }`}
                  onClick={() => setSelectRole("")}
                >
                  All <BsPeople className="mb-1" />
                </span>
                <span
                  className={`p-2 cursor-pointer ${
                    selectRole === 1 ? "borderbottom" : ""
                  }`}
                  onClick={() => setSelectRole(1)}
                >
                  Admin <MdOutlineAdminPanelSettings />
                </span>
              </span>
              <div>
                <p className="">
                  Total{" "}
                  <span style={{ color: "#3d7dda" }}>
                    {" "}
                    {selectRole === ""
                      ? "All"
                      : selectRole === 1
                      ? "Admin"
                      : roles.find((role) => role.id === parseInt(selectRole))
                          ?.name}
                  </span>{" "}
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
                {permission?.find((per) => per.name == "create-user")
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
                        onChange={(e) => {
                          const timeoutId = setTimeout(
                            () => setQuery(e.target.value),
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
                        setSortby={setSortby}
                        setOrderby={setOrderby}
                        orderby={orderby}
                        sortby={sortby}
                        setSelectRole={setSelectRole}
                        selectRole={selectRole}
                        setLimit={setLimit}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
            {users.length > 0 ? (
              <div className="p-3">
                <Table
                  handleDelete={handleDelete}
                  users={orderby === "desc" ? users.slice().reverse() : users}
                  handleEdit={handleEdit}
                />{" "}
                *
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
                        onClick={() => handlePagination("decrease")}
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
                        {currpage}
                      </span>
                      <span className="page-link" style={{ fontSize: "18px" }}>
                        /
                      </span>
                      <span className="page-link" style={{ fontSize: "18px" }}>
                        {pagingdetails.totalPage}
                      </span>
                    </li>
                    <li className="page-item">
                      <a
                        onClick={() => handlePagination("increase")}
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
        )}
      </div>
    </>
  );
};

export default User;

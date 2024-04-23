import React, { useEffect, useState } from "react";
import Table from "./Table";
import EditUser from "./EditUser";
import CreateUser from "./CreateUser";
import useUsers from "../core/action";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../../utils/components/SearchBar";
import Pagination from "../../utils/components/Pagination";
import Reset from "../../utils/components/Reset";
import Filter from "../../utils/components/Filter";
import loadingImg from "../../../assets/img/loading.gif";
import { setCreateToggle, setEditToggle } from "../core/reducer";

const User = () => {
  const { users, params, loading ,editToggle ,createToggle } = useSelector((state) => state.users);
  const pagingdetails = useSelector((state) => state.users.paging);
  const { userPermission } = useSelector((state) => state.auth);
  const { getUsers, handleFilter } = useUsers();
  const dispatch = useDispatch()
  const [editUser, setEditUser] = useState({});

  useEffect(() => {
    getUsers();
  }, [params]);

  const handleEdit = (editid) => {
    if (editid === 1) {
      return;
    } else {
      dispatch(setEditToggle(true));
      setEditUser(users.find((user) => user.id === editid));
    }
  };

  return (
    <>
      {loading ? (
        <div style={{ height: '80vh' }} className="d-flex justify-content-center align-items-center">
          <img width={40} src={loadingImg} alt="" />
        </div>
      ) : (
        <>
          {editToggle && (
            <>
              <EditUser
                handleEdit={handleEdit}
                editUser={editUser}
              />
            </>
          )}
          {createToggle && (
            <>
              <CreateUser/>
            </>
          )}
          <div className='m-3 custom-border p-3 rounded-3'>
            <h2 className="text-white fw-bold">Member list</h2>
            <p className="text-white-50">Here is the list of Members</p>
            <div >
              <div className="row">
                <div className="col-12 col-lg-6 d-flex">
                  <SearchBar  params={params} handleFilter={handleFilter} />
                  <Filter params={params} options={["name", "email" , "salary" , "phone"]} action={'sort'} handleFilter={handleFilter} />
                  <Filter params={params} options={["asc" , "desc"]} action={'order'} handleFilter={handleFilter} />
                  <Reset params={params} handleFilter={handleFilter} />
                </div>
                <div className="col-12 col-lg-6 d-flex justify-content-lg-end">
                  {userPermission?.find((per) => per.name === "create-user")
                    ?.status === 1 && (
                      <>
                        <button
                          onClick={() => dispatch(setCreateToggle(true))}
                          className="btn text-white custom-btn custom-border "
                        >
                          Add
                        </button>
                      </>
                    )}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <Table
                handleEdit={handleEdit}
                users={users}
              />{" "}
            </div>

            {/* pagination */}
            <Pagination params={params} pagingdetails={pagingdetails} handleFilter={handleFilter} />
          </div>
        </>
      )}
    </>
  );
};

export default User;

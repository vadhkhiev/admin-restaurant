import React, { useEffect, useState } from "react";
import Table from "./Table";
import EditUser from "./EditUser";
import CreateUser from "./CreateUser";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import useUsers from "../core/action";
import { useSelector } from "react-redux";
import SearchBar from "../../utils/components/SearchBar";
import Pagination from "../../utils/components/Pagination";

const User = () => {
  const { users , params } = useSelector((state) => state.users);
  const pagingdetails = useSelector((state) =>state.users.paging)
  const {userPermission} = useSelector((state) => state.auth);
  const { getUsers , handleFilter } = useUsers();
  const [edit, setEdit] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [create, setCreate] = useState(false);

  useEffect(() => {
    getUsers()
  }, [params]);


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

      <div className='m-3 custom-border p-3 rounded-3'>
          <h2 className="text-white fw-bold">Member list</h2>
          <p className="text-white-50">Here are the list of Members</p>
          <div>
            <div className="d-flex justify-content-between">
              <div className="w-50">
                <SearchBar params={params} handleFilter={handleFilter} />
              </div>
                {userPermission?.find((per) => per.name == "create-user")
                  ?.status === 1 && (
                  <>
                    <button
                      onClick={handleCreate}
                      className="btn text-white custom-btn custom-border "
                    >
                      Add
                    </button>
                  </>
                )}
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
            <Pagination params={params} pagingdetails={pagingdetails} handleFilter={handleFilter} />

          </div>
        

    </>
  );
};

export default User;

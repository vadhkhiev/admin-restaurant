import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import getalluser from "./core/getalluser";
import loadingImg from "../../assets/img/loading.gif";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { BsFillPersonPlusFill } from "react-icons/bs";
import axios from "axios"; // Import Axios library
import { CiSearch } from "react-icons/ci";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [confirm, setConfirm] = useState("");
  const tokens = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getalluser(
          tokens || localStorage.getItem("token")
        );
        setUsers(result.data);
        setLoading(false);
      } catch (error) {
        console.error("Error in component:", error);
      }
    };

    fetchData();
  }, [getalluser, tokens]);

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleDelete = (user) => {
    setConfirm(user);
  };
  console.log(users);

  const confirmDelete = async () => {
    try {
      const token = tokens || localStorage.getItem("token");
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

  return (
    <>
      {confirm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
          }}
          className="d-flex justify-content-center align-items-center"
        >
          <div className="p-3 bg-white rounded text-center">
            <p>
              Are you sure you want to{" "}
              <span className="text-danger">delete</span>{" "}
              <b>{confirm.username}</b> from the list?
            </p>
            <div className="d-flex justify-content-center">
              <button onClick={confirmDelete} className="btn btn-danger mx-3">
                Delete
              </button>
              <button
                onClick={() => setConfirm("")}
                className="btn btn-primary mx-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="container rounded bg-white my-1">
        {loading ? (
          <div className="d-flex flex-row justify-content-center align-items-center">
            <h4 style={{ color: "#222E3C" }}>Loading...</h4>
            <span>
              <img src={loadingImg} width={20} alt="" />
            </span>
          </div>
        ) : (
          <>
            <div className="d-flex justify-content-between  p-3">
              <h2>User Management</h2>
              <Link to="/users/create">
                <span className="btn btn-primary mx-3">
                  <BsFillPersonPlusFill /> Add
                </span>
              </Link>
            </div>
            {users.length > 1 && (
              <>
                <div className=" d-flex  align-items-center">
                  <div className="px-3"></div>
                  <div className="search-container">
                    <input
                      type="text"
                      placeholder="Search users..."
                      className="search-input m-1"
                      /*                    value={searchTerm}
                    onChange={e => setSearch(e.target.value)} */
                    />
                    <button className="search-button bg-white">Search</button>
                  </div>
                  <div className="px-3">
                    <span>Sort by:</span>
                    <select
                      className="rounded m-2"
                      id="mySelect"
                      value={selectedOption}
                      onChange={handleSelectChange}
                    >
                      <option value="Newest">Newest</option>
                      <option value="Oldest">Oldest</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            <div className="p-3">
              <Table
                handleDelete={handleDelete}
                users={
                  selectedOption === "Oldest" ? [...users].reverse() : users
                }
              />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default User;

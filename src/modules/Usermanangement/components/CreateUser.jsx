import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import Inputfield from "./Inputfield";
import useUsers from "../core/action";
const CreateUser = ({ setCreate }) => {
  const roles = useSelector((state) => state.roles.roles);
  const { handleCreate} = useUsers();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const currentDateTime = new Date();
    const formattedDate = (currentDateTime?.toISOString() )?.slice(0, -5) + 'Z'
    setUserData(prevUserData => ({
      ...prevUserData,
      hire_date: formattedDate,
      role_id: null,
    }));
  }, []);

  const handleInputChange = (field, value) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      [field]: value,
    }));
  };
  const handleSubmit = async () => {
    handleCreate(userData , setCreate)
  };

  return (
    <div >
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(62,64,87, 0.35)",
          zIndex: 10,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div
          style={{

            boxShadow: 'rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset',
            borderRadius: "0.5rem",
            backdropFilter:'blur(5px)',
            width:  "50%",
          
          }}
          className="position-relative p-5 border"
        >
          <div
            style={{
              background: "rgba(239,240,241 1)",
              top: "4px",
              left: "7px",
              zIndex: "1",
              fontSize: "12px",
            }}
            className="d-flex  fs-3 text-danger position-absolute"
          >
            <IoCloseCircleOutline
              style={{ cursor: "pointer" }}
              onClick={() => setCreate(false)}
            />
          </div>
          <div >
            <div>
              <form style={{ background: "rgba(239,240,241 1)" }}>
                <div>
                  <div >
                    <div>
                       <div className="w-100 d-flex gap-1">

                        <div className="w-100 d-flex flex-column mt-3">
                          <div className="d-flex">
                            <label className="text-white">Hired Date</label>
                          </div>
                          <input
                            className="text-center form-control"
                            type="date"
                            id="datetime"
                            value={userData?.hire_date?.slice(0, 10)}
                            onChange={(e) => {
                              const currentDate = new Date();
                              const currentTime = currentDate
                                ?.toISOString()
                                .slice(11, 19); // Extract time part from ISO string
                              const formattedDateTime =
                                e.target.value + "T" + currentTime + "Z";
                              handleInputChange("hireDate", formattedDateTime);
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* name and username */}

                    <Inputfield
                      action1={(e) => handleInputChange("name", e.target.value)}
                      action2={(e) =>
                        handleInputChange("username", e.target.value)
                      }
                      obj={{ label1: "Name", label2: "Username", type: "text" }}
                    />

                    {/* email */}

                    <div className="input-group flex-nowrap gap-3 mt-3">
                      <div className="w-100 d-flex flex-column position-relative">
                        <span
                          style={{
                            top: "-10px",
                            left: "10px",
                            zIndex: "1",
                            fontSize: "12px",
                          }}

                        >
                        </span>
                        <input
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          type="text"
                          className="form-control p-2 rounded-3"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>

                    {/* role */}

                    <div className="w-100 mt-3 d-flex gap-1">
                      <div className="w-50 position-relative">
                        <div
                          style={{
                            top: "-10px",
                            left: "10px",
                            zIndex: "1",
                            fontSize: "12px",
                          }}
                        
                        >
                        </div>
                        <select
                          onChange={(e) =>
                            handleInputChange(
                              "role_id",
                              parseInt(e.target.value)
                            )
                          }
                          className="form-select form-select-md"
                          aria-label=".form-select-sm "

                        >
                          <option selected hidden>Role</option>
                          {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>

                      </div>
                      <div className="w-50 d-flex flex-column position-relative">
                        <span
                          className=""
                          style={{
                            top: "-10px",
                            left: "10px",
                            zIndex: "1",
                            fontSize: "12px",
                          }}
                        >
                        </span>
                        <select
                          onChange={(e) =>
                            handleInputChange("gender", e.target.value)
                          }
                          className="form-select form-select-md "
                          aria-label=".form-select-sm "
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                        </select>
                      </div>
                    </div>

                    {/* password */}

                    <Inputfield
                      action1={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      action2={(e) =>
                        handleInputChange("confirm_password", e.target.value)
                      }
                      obj={{
                        type: "password",
                        label1: "Password",
                        label2: "Confirm Password",
                      }}
                    />

                    {/* salary and phone */}
                    <Inputfield
                      action1={(e) =>
                        handleInputChange("salary", parseInt(e.target.value))
                      }
                      action2={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      obj={{
                        type: "number",
                        label1: "Salary",
                        label2: "Phone",
                      }}
                    />
                    <div className="d-flex justify-content-center mt-3">
                      <button
                        type="button"
                        onClick={handleSubmit}
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;


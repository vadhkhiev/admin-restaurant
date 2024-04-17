import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import Inputfield from "./Inputfield";
import useUsers from "../core/action";
import { setCreateToggle } from "../core/reducer";
const CreateUser = () => {
  const roles = useSelector((state) => state.roles.roles);
  const { createUser } = useUsers();
  const [userData, setUserData] = useState({});
  const dispatch = useDispatch()
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
    createUser(userData )
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
          backgroundColor: "rgba(10,10,10, 0.5)",
          zIndex: 10,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div
          style={{

            borderRadius: "0.5rem",
            backdropFilter:'blur(5px)',
            width:  "50%",
          
          }}
          className="position-relative p-3 border"
        >
          <h3 className="text-white my-2 mt-3">Create User</h3>
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
              onClick={() => dispatch(setCreateToggle(false ))}
            />
          </div>
          <div >
            <div>
              <form style={{ background: "rgba(239,240,241 1)" }}>
                <div>
                  <div className="p-0" >

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
                      <div className="w-100  d-flex flex-column position-relative">
                        <input
                        style={{background:'#09090b'}}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          type="text"
                          className="form-control p-2 rounded-3 custom-border"
                          placeholder="Email"
                          required
                        />
                      </div>
                    </div>

                    {/* role */}

                    <div className="w-100 mt-3 d-flex gap-1">
                        <select
                          onChange={(e) =>
                            handleInputChange(
                              "role_id",
                              parseInt(e.target.value)
                            )
                          }
                          className="form-select form-select-md p-2 custom-border"
                          style={{ background:'#09090b' , color: 'rgb(50, 50, 50)' }}

                        >
                          <option selected hidden>Role</option>
                          {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                              {role.name}
                            </option>
                          ))}
                        </select>

                    </div>
                    <div className="w-100 mt-3 d-flex gap-1">
                    <div className="w-100 d-flex flex-column ">
                        <select
                        style={{ background:'#09090b' , color: 'rgb(50, 50, 50)' }}
                          onChange={(e) =>
                            handleInputChange("gender", e.target.value)
                          }
                          className="form-select form-select-md p-2 custom-border"
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
                        className="btn custom-border custom-btn text-white" 
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


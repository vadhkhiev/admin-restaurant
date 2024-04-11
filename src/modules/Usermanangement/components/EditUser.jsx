import React, { useEffect, useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
import useUsers from '../core/action';

const EditUser = ({ handleEdit, editUser }) => {
  const roles = useSelector((state) => state.roles.roles);
  const { updateUser } = useUsers();

  const [passwordChange , setPasswordChange] = useState({
    password: "",
    confirm_password: ""
  })
  const [editing, setEditing] = useState({
    avatar : editUser.avatar,
    name: editUser.name,
    role_id: (roles.find((r) => r.name === editUser?.role?.name))?.id, 
    phone: editUser.phone,
    gender: editUser.gender,
    salary: editUser.salary,
  });
  const [fileInput, setFileInput] = useState(null);
  const [toggleChange, setToggleChange] = useState(false)

  const handleUpdate = () =>{
    const formdata = new FormData();
    if(fileInput){
      formdata.append("file", fileInput);
    }
    updateUser(editing , editUser.id , fileInput ? formdata : null)
    
  }
  
  return (
    <div>
     
        <div
        className='d-flex justify-content-center align-items-center'
         style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '100%',
            height: '100%',
            backgroundColor: "rgba(62,64,87, 0.35)",
            zIndex: 10,
            borderRadius: '10px 0 0 10px',
            transition: 'all 0.3s ease-in-out',
            
          }} 
        >
          <main className='rounded-3 border col-12 col-md-6' style={{
            backdropFilter: 'blur(5px)',
          }}
          >
            <div >
                <MdOutlineCancel onClick={handleEdit} className='fs-3 text-danger m-2'/>
              </div>
              <div  className={`${toggleChange ? "d-none" : "d-block"}`}>
              <div className=' rounded-3'  >
                <h3  className=' text-center p-1'>Editing
                <span className='text-primary'> {editUser.name}</span> 
                </h3>
              </div>
              
              <div className=' p-1 rounded-3' >

              <div  className='d-flex my-3 justify-content-between'> 
              <div className='w-25 d-flex justify-content-center'>
                <img style={{boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 1) 0px 0px 1px 1px"}} src={editUser.avatar} width={65} height={65}  alt="" className='rounded-circle ' />
              </div>
               <div className='w-75 d-flex justify-content-start m-3'>
               <div>
                <input  onChange={(e) => setFileInput(e.target.files[0])} className="form-control  " id="formFileSm" type="file"/>
               </div>
               </div>
              </div>

              {/* name */}
              <div className="m-3" style={{ color: "#495057" }}>
                <p className="fs-4 text-dark p-1 d-flex justify-content-between">
                  <span className="w-25 text-center">Name : </span>
                  <input
                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    className="w-75 p-1"
                    style={{
                      color: "#495057",
                      backgroundColor: "#eff0f1",
                      borderRadius: "5px",
                      border: "none",
                    }}
                    type="text"
                    value={editing.name}
                  />
                </p>
              </div>

              {/* role */}
              <div className="m-3" style={{ color: "#495057" }}>
                <p className="fs-4 text-dark p-1 d-flex justify-content-between">
                  <span className="w-25 text-center">Role : </span>
                  <select
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        role_id: parseInt(e.target.value),
                      })
                    }
                    className="w-75 p-1"
                    style={{
                      color: "#495057",
                      backgroundColor: "#eff0f1",
                      borderRadius: "5px",
                      border: "none",
                    }}
                  >
                    <option value="">
                      {editUser?.role?.name}
                    </option>
                    {roles.filter((role) => role.name !== editUser?.role?.name).map((role) => (
                        <option value={role.id} key={role?.id}>
                          {role?.name}
                        </option>
                      ))}
                  </select>
                </p>
              </div>

              {/* phone */}
              <div className="m-3" style={{ color: "#495057" }}>
                <p className="fs-4 text-dark p-1 d-flex justify-content-between">
                  <span className="w-25 text-center">Phone : </span>
                  <input
                    onChange={(e) =>
                      setEditing({ ...editing, phone: e.target.value })
                    }
                    className="w-75 p-1"
                    style={{
                      color: "#495057",
                      backgroundColor: "#eff0f1",
                      borderRadius: "5px",
                      border: "none",
                    }}
                    type="number"
                    value={editing.phone}
                  />
                </p>
              </div>

              {/* gender */}
              <div className="m-3" style={{ color: "#495057" }}>
                <p className="fs-4 text-dark p-1 d-flex justify-content-between">
                  <span className="w-25 text-center">Gender : </span>
                  <select
                    onChange={(e) =>
                      setEditing({ ...editing, gender: e.target.value })
                    }
                    className="w-75 p-1"
                    style={{
                      color: "#495057",
                      backgroundColor: "#eff0f1",
                      borderRadius: "5px",
                      border: "none",
                    }}
                    defaultValue={editing.gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </p>
              </div>

              <p onClick={()=>setToggleChange(!toggleChange)} className="fs-5 cursor-pointer pb-2 text-center text-primary underline">Change Password ?</p>
              <div className="d-flex justify-content-center pb-3">
                <button
                  className="btn btn-primary w-25 p-2"
                  onClick={handleUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          </div>

          <div className='w-100' style={{display: toggleChange ? "block" : "none"}}>
            <div className='w-100 mb-3 d-flex flex-column gap-3 text-nowrap justify-content-center '>
               <div>
                <p  className='fs-4 text-center'>Reset <span className='text-primary'>{editUser?.name}'s</span> Password</p>
               </div>
                <div className='input'>
                  <h5>New Password:</h5>
                  <input
                   type="text"
                   onChange={(e) =>setPasswordChange({
                    ...passwordChange,
                    password: e.target.value
                   })}
                    name="password"  />
                </div>
                <div className='input'>
                  <h5>Confirm Password:</h5>
                  <input
                  onChange={(e) =>setPasswordChange({
                    ...passwordChange,
                    confirm_password: e.target.value
                  })}
                   type="text" name="confirm_password"  />
                </div>
                <div className='d-flex justify-content-center'>
                <button className='btn btn-primary w-25 p-2'  >Save</button>
                </div>

            </div>
             <p className='text-primary text-decoration-underline text-center cursor-pointer' onClick={() => setToggleChange(!toggleChange)}>Back ?</p>
          </div>
          
        </main>
      </div>
    </div>
  );
};

export default EditUser;

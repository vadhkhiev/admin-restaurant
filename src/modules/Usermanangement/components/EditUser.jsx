import React, { useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import useUsers from '../core/action';
import { setEditToggle } from '../core/reducer';
import avatarImg from "../../../assets/img/avatar.jpg"

const EditUser = ({  editUser }) => {
  const roles = useSelector((state) => state.roles.roles);
  const { updateUser , changePassword   } = useUsers();
  const dispatch = useDispatch()
  const [passwordChange , setPasswordChange] = useState({
    password: "",
    confirm_password: ""
  })

  const [editing, setEditing] = useState({
    name: editUser.name,
    role_id: (roles.find((r) => r.name === editUser?.role?.name))?.id, 
    phone: editUser.phone,
    gender: editUser.gender,
    salary: editUser.salary,
    avatar : editUser.avatar
  });
  const [fileInput, setFileInput] = useState(null);
  const [toggleChange, setToggleChange] = useState(false)

  const handleUpdate = async () =>{
    await updateUser(editing, editUser.id , fileInput)
  }

  const handlePassword =  () =>{
    changePassword(passwordChange ,editUser.id )
    dispatch(setEditToggle(false))
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
            backgroundColor: "rgba(10,10,10, 0.5)",
            zIndex: 10,
            borderRadius: '10px 0 0 10px',
            transition: 'all 0.3s ease-in-out',
            
          }} 
        >
          <main className='rounded-3 border col-12 col-md-5' style={{
            backdropFilter: 'blur(5px)',
          }}
          >
            <div >
                <MdOutlineCancel onClick={() => dispatch(setEditToggle(false))} className='fs-3 text-danger m-2 cursor-pointer'/>
              </div>
              <div  className={`${toggleChange ? "d-none" : "d-block"} mx-3`}>
              <div className=' rounded-3 w-100 d-flex  justify-content-center'  >
                <div className='d-flex flex-row '>
                <img style={{boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 1) 0px 0px 1px 1px"}} src={fileInput ? URL.createObjectURL(fileInput) : (editUser?.avatar && editUser.avatar?.length > 50) ? editUser?.avatar : avatarImg } width={60} height={60}  alt="" className='rounded-circle ' />
                <h4  className=' text-white  w-50 ms-2 text-nowrap'>Editing
                <span className='text-primary'> {editUser?.name}</span> 
                </h4>
                </div>
              </div>
              
              <div className='  rounded-3' >

              <div  className='d-flex my-3 justify-content-between'> 
               <div className='w-100  '>
                <input style={{background:'#09090b'}} onChange={(e) => setFileInput(e.target.files[0])} className="p-1 w-100  rounded-3 custom-border text-white"  type="file"/>
               </div>
              </div>
              {/* name */}
              <div className="" style={{ color: "#495057" }}>
                <p className="fs-5 text-dark  ">
                  <input

                    onChange={(e) =>
                      setEditing({ ...editing, name: e.target.value })
                    }
                    className="w-100 p-2 custom-border rounded-3 text-white"
                    style={{
                      color: "#495057",
                      backgroundColor: "#09090b",
                    }}
                    type="text"
                    value={editing.name}
                  />
                </p>
              </div>

              {/* role */}
              <div className="" style={{ color: "#495057" }}>
                <p className="fs-5 text-dark ">
                  <select
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        role_id: parseInt(e.target.value),
                      })
                    }
                    className="w-100 p-2 custom-border  rounded-3 text-white"
                    style={{
                      color: "#495057",
                      backgroundColor: "#09090b",
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
              <div >
                <p className="fs-5 text-dark ">
                  <input
                    onChange={(e) =>
                      setEditing({ ...editing, phone: e.target.value })
                    }
                    className="w-100 p-2 rounded custom-border rounded-3 text-white"
                    style={{
                      color: "#495057",
                      backgroundColor: "#09090b",
                    }}
                    type="number"
                    value={editing.phone}
                  />
                </p>
              </div>

              {/* gender */}
              <div >
                <p className="fs-5 text-dark ">
                  <select
                    onChange={(e) =>
                      setEditing({ ...editing, gender: e.target.value })
                    }
                    className="w-100 p-2  custom-border rounded text-white" 
                    style={{
                      color: "#495057",
                      backgroundColor: "#09090b",

                    }}
                    defaultValue={editing.gender}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </p>
              </div>

              <p onClick={()=>setToggleChange(!toggleChange)} className="fs-5 cursor-pointer  text-center text-primary underline">Change Password ?</p>
              <div className="d-flex justify-content-center pb-3">
                <button
                  className="btn w-25 custom-btn custom-border p-2 text-white"
                  onClick={handleUpdate}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>

          <div className='w-100' style={{display: toggleChange ? "block" : "none"}}>
            <div className='w-100 mb-3 p-3 d-flex flex-column  text-nowrap justify-content-center '>
               <div>
                <p  className='fs-4 text-center text-white'>Reset <span className='text-primary'>{editUser?.name}'s</span> Password</p>
               </div>
               <div className=''>
               <input
                   type="text"
                   className='w-100 custom-border p-2 rounded-3 mb-3 text-white'
                   style={{background:'#09090b'}} 
                   placeholder='Enter New Password'
                   onChange={(e) =>setPasswordChange({
                    ...passwordChange,
                    password: e.target.value
                   })}
                    name="password"  />
                    <br />
                     <input
                  className='w-100 custom-border p-2 rounded-3 text-white'
                  style={{background:'#09090b'}}
                  placeholder='Confirm Password'
                  onChange={(e) =>setPasswordChange({
                    ...passwordChange,
                    confirm_password: e.target.value
                  })}
                   type="text" name="confirm_password"  />
                

               </div>
                <p className='text-primary text-decoration-underline text-center cursor-pointer mt-2' onClick={() => setToggleChange(!toggleChange)}>Back ?</p>
                <div className='d-flex justify-content-center'>
                <button className='btn  custom-btn custom-border text-white w-25' onClick={handlePassword}  >Save</button>
                </div>

            </div>

          </div>
          
        </main>
      </div>
    </div>
  );
};

export default EditUser;

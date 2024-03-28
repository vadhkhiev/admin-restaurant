import React, { useEffect, useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";
import avatar from "../../../assets/img/avatar.jpg";
import { useSelector } from "react-redux";
import axios from "axios";
import getroles from '../../layout/core/getroles';

const EditUser = ({ handleEdit, editUser, setEdit, edit }) => {
  const token =
  useSelector((state) => state.auth.token) || localStorage.getItem("token");
  const [roles , setRoles] = useState([]);
  console.log(editUser)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getroles(token);
        console.log(result.data)
        setRoles(result.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, [token]);

  useEffect(() => {
    const filteredRole = roles.find((r) => r.name === editUser?.role?.name);
    if (filteredRole) {
      setEditing({ ...editing, role_id: filteredRole.id });
    }
  }, [roles, editUser?.role?.name]);


  const [editing, setEditing] = useState({
    avatar : editUser.avatar,
    name: editUser.name,
    role_id: (roles.find((r) => r.name === editUser?.role?.name))?.id, 
    phone: editUser.phone,
    gender: editUser.gender,
    salary: editUser.salary,
  });




  console.log(editing)


  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [fileInput, setFileInput] = useState(null);

  

  useEffect(() => {
    const handleResize = () => {
      setScreensize(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  const [screensize , setScreensize] = useState(window.innerWidth);

  const handleUpload = async () => {
    const formdata = new FormData();
    formdata.append("file", fileInput);
  
    axios.post(`/api/user/${editUser?.id}/profile-avatar`, formdata, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(response => {
 
      
    })
    .catch(error => {
      console.error(error);
    });
  };

  const handleChange = async () => {	
    try {
      const data = { ...editing, username: editUser.username };
      const filteredData = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== "")
      );
      const result = await axios.put(`/api/user/${editUser?.id}`, filteredData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (fileInput) {
        await handleUpload();
      }

      setError('');
      setSuccessMessage('Update successful');
      setTimeout(() => {
        setEdit(!edit);
        setSuccessMessage("");
      }, 1000);
    } catch (error) {
      setError("error");
      console.log(error);
      setTimeout(() => setSuccessMessage(""), 1000);
    }
  };
  
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
            zIndex: 9999,
            borderRadius: '10px 0 0 10px',
            transition: 'all 0.3s ease-in-out',
            
          }} 
        >
          <main className='rounded-3 border' style={{
            backdropFilter: 'blur(5px)',
            width: screensize < 768 ? '100%' : '45%',
          }}
          >
            <div >
                <MdOutlineCancel onClick={handleEdit} className='fs-3 text-danger m-2'/>
              </div>
              <div >
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
                    placeholder={editUser.name}
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
                    placeholder={editUser.phone}
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
              {/*                <div className='m-3' style={{color: '#495057'}}>
                <p className='fs-4 p-2 d-flex justify-content-between'>
                    <span className='w-25 text-center'>Salary to: </span>
                    <input onChange={(e)=> setEditing({ ...editing, salary: parseInt(e.target.value) })} className='w-75 p-1' style={{color: '#495057',backgroundColor: '#eff0f1',borderRadius:'5px',border:'none'}}  type='number' placeholder={editUser.salary} />
                  </p>
                </div> */}
              {error && (
                <div
                  className="position-fixed top-0 start-50 translate-middle"
                  style={{
                    background: "#f8d7da",
                    color: "#721c24",
                    border: "1px solid #f5c6cb",
                    borderRadius: "0.25rem",
                    padding: "0.75rem 1.25rem",
                    margin: "1rem 0",
                  }}
                >
                  {error}
                </div>
              )}
              {successMessage && (
                <div
                  className="position-fixed top-0 start-50 translate-middle"
                  style={{
                    background: "#d4edda",
                    color: "#155724",
                    border: "1px solid #f5c6cb",
                    borderRadius: "0.25rem",
                    padding: "0.75rem 1.25rem",
                    margin: "1rem 0",
                  }}
                >
                  {successMessage}
                </div>
              )}
              <div className="d-flex justify-content-center pb-3">
                <button
                  onClick={handleChange}
                  className="btn btn-primary w-25 p-2"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditUser;

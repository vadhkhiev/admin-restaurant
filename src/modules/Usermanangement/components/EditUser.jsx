import React, { useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";
import avatar from '../../../assets/img/avatar.jpg'
import { useSelector } from 'react-redux';
import axios from 'axios';

const EditUser = ({handleEdit,editUser ,setEdit , edit}) => {

  const roles = useSelector((state) => state.roles.roles);

  const role = roles.filter((r) => r.name === editUser.roleEntity?.name)[0];

  const [editing, setEditing] = useState({
    avatar: 'avatar',
    name: editUser.name,
    role_id: role?.id, // Use role.id here
    phone: editUser.phone,
    gender: editUser.gender,
    salary: editUser.salary,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  console.log(roles);
  console.log(editUser);

  const handleChange = async (e) => {
    try {
      const data = { ...editing, username: editUser.username };
      const filteredData = Object.fromEntries(Object.entries(data).filter(([_, value]) => value !== ''));
      const result = await axios.put(`/api/user/${editUser.id}`, filteredData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setError('');
      setSuccessMessage('Update successful');
      setTimeout(() => {
        setEdit(!edit);
        setSuccessMessage(''); // Clear success message after 1 second
      }, 1000);
    } catch (error) {
      setError('error');
      console.log(error);
      setTimeout(() => setSuccessMessage(''), 1000); // Clear success message after 1 second
    }
  };

  console.log(editing);

  
  return (
    <div>
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '30%',
            height: '100%',
            backgroundColor: 'rgba(125,125,125, 0.35)',
            zIndex: 9999,
            borderRadius: '10px 0 0 10px',
            transition: 'all 0.3s ease-in-out',
            
          }}
          
        >
            <div >
              <MdOutlineCancel onClick={handleEdit} className='fs-3 text-white m-2'/>
            </div>
            <div >
            <div className='mx-3  rounded-3' style={{backgroundColor: 'rgba(255,255,255, 1)'}} >
              <h4 style={{color: '#495057'}} className=' text-center p-1'>Editing
               <span style={{color:'#3d7dda'}}> {editUser.name}</span> 
               </h4>
            </div>
            
            <div className='m-3 p-1 rounded-3' style={{backgroundColor: 'rgba(255,255,255, 1)'}}>

            <div  className='d-flex my-3 justify-content-center'> 
              <img style={{boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 1) 0px 0px 1px 1px"}} src={avatar} width={50} height={50}  alt="" className='rounded-circle' />
            </div>

              <div className='m-3' style={{color: '#495057'}} >
                <p className='fs-5 p-1 d-flex justify-content-between'>
                  <span className='w-25'>Name : </span>
                  <input onChange={(e) => setEditing({ ...editing, name: e.target.value })} className='w-75 p-1' style={{color: '#495057',backgroundColor: '#eff0f1',borderRadius:'7px',border:'none'}}  type="text" placeholder={editUser.name} />
                </p>
               </div>
               <div className='m-3' style={{color: '#495057'}}>
                 <p className='fs-5 p-1 d-flex justify-content-between'>
                   <span className='w-25'>Role : </span>
                   <select onChange={(e) => setEditing({ ...editing, role_id: parseInt(e.target.value) })} className='w-75 p-1' style={{color: '#495057',backgroundColor: '#eff0f1',borderRadius:'7px',border:'none'}}>
                     <option value={editUser.role_id}  selected>{editUser.roleEntity.name}</option>
                     {roles.filter((role) => role.id !== editUser.roleEntity.id).map((role) => (
                       <option value={role.id} key={role.id} >{role.name}</option>
                     ))}
                   </select>
                 </p>
               </div>

               <div className='m-3' style={{color: '#495057'}}>
               <p className='fs-5 p-1 d-flex justify-content-between'>
                  <span className='w-25'>Phone : </span>
                  <input onChange={(e)=> setEditing({ ...editing, phone: e.target.value })} className='w-75 p-1' style={{color: '#495057',backgroundColor: '#eff0f1',borderRadius:'7px',border:'none'}}  type='number' placeholder={editUser.phone} />
                </p>
               </div>
               <div className='m-3' style={{color: '#495057'}}>
               <p className='fs-5 p-1 d-flex justify-content-between'>
                  <span className='w-25'>Gender : </span>
                  <select onChange={(e) => setEditing({ ...editing, gender: e.target.value })} className='w-75 p-1' style={{color: '#495057',backgroundColor: '#eff0f1',borderRadius:'7px',border:'none'}} defaultValue={editing.gender}>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </p>
               </div>
{/*                <div className='m-3' style={{color: '#495057'}}>
               <p className='fs-4 p-2 d-flex justify-content-between'>
                  <span className='w-25'>Salary to: </span>
                  <input onChange={(e)=> setEditing({ ...editing, salary: parseInt(e.target.value) })} className='w-75 p-1' style={{color: '#495057',backgroundColor: '#eff0f1',borderRadius:'7px',border:'none'}}  type='number' placeholder={editUser.salary} />
                </p>
               </div> */}
               {error && (
                    <div className='position-fixed top-0 start-50 translate-middle' style={{ background: '#f8d7da', color: '#721c24', border: '1px solid #f5c6cb', borderRadius: '0.25rem', padding: '0.75rem 1.25rem', margin: '1rem 0' }}>
                      {error}
                    </div>
               )}
                {successMessage && (
                    <div className='position-fixed top-0 start-50 translate-middle' style={{ background: '#d4edda', color: '#155724', border: '1px solid #f5c6cb', borderRadius: '0.25rem', padding: '0.75rem 1.25rem', margin: '1rem 0' }}>
                    {successMessage}
                  </div>
               )}
               <div className='d-flex justify-content-center pb-3'>
                <button onClick={handleChange} className='btn btn-primary w-25 p-2'>Save</button>
               </div>
            </div>
            </div>

        </div>
    </div>
  )
}

export default EditUser
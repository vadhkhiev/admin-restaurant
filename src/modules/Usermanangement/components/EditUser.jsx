import React, { useState } from 'react'
import { MdOutlineCancel } from "react-icons/md";
import avatar from '../../../assets/img/avatar.jpg'
import { useSelector } from 'react-redux';

const EditUser = ({handleEdit,editUser}) => {
  const editto = {
    avatar : 'avatar',
    name: editUser.name,
    role_id : editUser.roleEntity.name,
    phone : editUser.phone,
    gender : editUser.gender,
}
  const roles = useSelector((state) => state.roles.roles);
  const [editing , setEditing ] = useState(editto)

  console.log(editing)

  return (
    <div>
        <div style={{
            position: 'fixed',
            top: 0,
            right: 0,
            width: '40vw',
            height: '100%',
            backgroundColor: 'rgba(62,64,87, 0.35)',
            zIndex: 9999,
            borderRadius: '10px 0 0 10px',
            transition: 'all 0.3s ease-in-out',
          }}
          
        >
            <div >
              <MdOutlineCancel onClick={handleEdit} className='fs-1 text-white m-2'/>
            </div>
            <div >
            <div className='m-3 rounded-3' style={{backgroundColor: 'rgba(255,255,255, 1)'}} >
              <h2 style={{color: '#495057'}} className=' text-center'>Editing {editUser.name}'s</h2>
            </div>


            <div className='m-3 p-3 rounded-3' style={{backgroundColor: 'rgba(255,255,255, 1)'}}>

            <div  className='d-flex justify-content-center'> 
              <img style={{boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 1) 0px 0px 1px 1px"}} src={avatar} width={80} height={80}  alt="" className='rounded-circle' />
            </div>

              <div className='m-3' style={{color: '#495057'}} >
                <p className='fs-4 p-2 d-flex justify-content-between'>
                  <span className='w-25'>Name to: </span>
                  <input onChange={(e) => setEditing({ ...editing, name: e.target.value })} className='w-75 p-1' style={{color: '#495057',backgroundColor: '#eff0f1',borderRadius:'7px',border:'none'}}  type="text" placeholder={editUser.name} />
                </p>
               </div>
               <div className='m-3' style={{color: '#495057'}}>
                 <p className='fs-4 p-2 d-flex justify-content-between'>
                   <span className='w-25'>Role to: </span>
                   <select onChange={(e) => setEditing({ ...editing, role_id: parseInt(e.target.value) })} className='w-75 p-1' style={{color: '#495057',backgroundColor: '#eff0f1',borderRadius:'7px',border:'none'}}>
                     {roles.map((role) => (
                       <option value={role.id} selected={editUser.roleId === role.id}>{role.name}</option>
                     ))}
                   </select>
                 </p>
               </div>

               <div className='m-3' style={{color: '#495057'}}>
               <p className='fs-4 p-2 d-flex justify-content-between'>
                  <span className='w-25'>Phone to: </span>
                  <input onChange={(e)=> setEditing({ ...editing, phone: e.target.value })} className='w-75 p-1' style={{color: '#495057',backgroundColor: '#eff0f1',borderRadius:'7px',border:'none'}}  type='number' placeholder={editUser.phone} />
                </p>
               </div>
               <div className='m-3' style={{color: '#495057'}}>
               <p className='fs-4 p-2 d-flex justify-content-between'>
                  <span className='w-25'>Gender to: </span>
                  <select onChange={(e) => setEditing({ ...editing, gender: e.target.value })} className='w-75 p-1' style={{color: '#495057',backgroundColor: '#eff0f1',borderRadius:'7px',border:'none'}}>
                    <option value="male" selected={editing.gender === 'male'}>Male</option>
                    <option value="female" selected={editing.gender === 'female'}>Female</option>
                  </select>
                </p>
               </div>
               <div className='d-flex justify-content-center'>
                <button className='btn btn-primary w-25 p-2'>Save</button>
               </div>
            </div>
            </div>

        </div>
    </div>
  )
}

export default EditUser
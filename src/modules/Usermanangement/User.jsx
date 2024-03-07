import React, { useEffect, useState } from 'react';
import Table from './components/Table';
import getalluser from './core/getUsers';
import loadingImg from '../../assets/img/loading.gif';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'; 
import { storeUsers } from './core/allusersSlice';
import Confirm from './components/Confirm';
import EditUser from './components/EditUser';
import CreateUser from './components/CreateUser';


const User = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [confirm, setConfirm] = useState('');
  const [selectUser , setSelectUser] = useState(false)
  const [edit , setEdit] = useState(false)
  const [editUser , setEditUser] = useState({})
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');  
  const dispatch = useDispatch()



  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getalluser(token , selectUser === true ? '/api/user?roleId=1' : '/api/user');
        dispatch(storeUsers(result.data))
        setUsers(result.data);
        setLoading(false);
      } catch (error) {
        console.error('Error in component:', error);
      }
    };
    fetchData();
  }, [selectUser ,edit]);



  const handleDelete = (user) => {
    if(user.id===1){
      alert(`You can not delete Admin Account : \u{1F621}\u{1F621}\u{1F621}\u{1F621}\u{1F621}`)
      return;
    }
    setConfirm(user);
  };

  const confirmDelete = async () => {
     try {
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
      console.error('Error deleting user:', error);
    } finally {
      // Close the confirm/modal after deletion
      setConfirm('');
    } 
  };

  const cancelDelete = () => {
    setConfirm('');
  }
  const handleEdit = (editid) => {
    if (editid === 1) {
      alert(`You can not edit Admin Account : \u{1F621}\u{1F621}\u{1F621}\u{1F621}\u{1F621}`);
    } else {
      setEdit(!edit);
      setEditUser(users.find((user) => user.id === editid));
    }
  };


  return (
    <>
    {/* Modal */}
      {confirm && (
        <Confirm confirmDelete={confirmDelete} confirm={confirm} cancelDelete={cancelDelete}/>
      )}

      {edit && (
        <>
        <EditUser handleEdit={handleEdit} editUser={editUser} setEdit={setEdit} edit={edit}  />
        </>
      )
      }

      {/* <CreateUser/> */}

      {/* End of Modal */}

      <div className="container rounded  my-1">
        {loading ? (
          <div className='d-flex flex-row justify-content-center align-items-center'>
            <h4 >Loading...</h4>
            <span>
              <img src={loadingImg} width={20} alt="" />
            </span>
          </div>
        ) : (
          <>{
            users.length > 0 && (
              <>
              <div  className='p-4 px-3 d-flex justify-content-between'>
                <span style={{boxShadow: "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px"}} className='fw-bold p-2 rounded-3' >
                  <span className='me-3 p-2' style={selectUser===false ? {borderBottom: '3px solid #3e4057',cursor:'pointer'} : {cursor:'pointer'}} onClick={() => setSelectUser(false)} >All</span>
                  <span className=' p-2' style={!selectUser===false ? {borderBottom: '3px solid #3e4057',cursor:'pointer'} : {cursor:'pointer'}} onClick={() => setSelectUser(true)} >Admin</span>
                </span>
                <div>
                  <p className='fw-bold'>Total {selectUser === true ? 'Admin' : ' Members '}: {users.length}</p>
               </div>
              </div>

              </>
            )
          }
              <div className='pt-3 px-3 d-flex justify-content-between '>
               <div className='d-flex'>
                 <h2 style={{color:'#45495c'}} className='fw-bold me-3'>Members</h2>
                 <button  style={{backgroundColor:'#6c738f'}} className='btn text-white fw-bold'>Add More</button>
               </div>
               <div>
               <button  style={{backgroundColor:'#6c738f'}} className='btn text-white fw-bold'> {`< Filter`}</button>
               </div>
                
              </div>
            {users.length > 0 && (
              <>
              <div className='p-3'>
                <Table
                 handleDelete={handleDelete}
                 users={users}
                 handleEdit={handleEdit}
               />
             </div>
              </>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default User;




{/* <Link to='/users/create'>
<span className='btn btn-primary mx-3'>
  <BsFillPersonPlusFill /> Add
</span>
</Link> */}
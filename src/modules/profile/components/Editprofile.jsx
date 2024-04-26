import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import profileImg from '../../../assets/img/avatar.jpg'
import useCurrentUser from '../core/action';

const Editprofile = ({ setPopupedit, profile}) => {
  const [editedProfile, setEditedProfile] = useState({
    "name": profile?.name,
    "gender": profile?.gender,
    "phone": profile?.phone,
    "avatar": profile?.avatar
  });
  const [error, setError] = useState('');
  const [img, setImg] = useState(null)
  const {  handleEditProfile ,handleChangePw , getCurrentUser} = useCurrentUser();
  const [toggleChange, setToggleChange] = useState(false)
  const [password , setPassword] = useState({
    "old_password": "",
    "password": "",
    "confirm_password": ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const collectData = (e) => {
    const { name, value } = e.target;
    setPassword(prevState => ({
      ...prevState,
      [name]: value
    }));
  
    if (name === 'confirm_password' && value !== password.password) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };
  
  const handleChangePass = async () => {
    try {
       handleChangePw(password);
      setTimeout(() => {
        setPopupedit(false);
      }, 1000);
    } catch (error) {
      console.error('Error changing password:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      handleEditProfile(editedProfile , img);
      getCurrentUser();
      setTimeout(() => {
        setPopupedit(false);
      }, 1000);
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(10,10,10, 0.35)",
          zIndex: 3,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div style={{ backdropFilter: "blur(10px)", width:'40%' }} className=' border rounded-3 overflow-hidden'>
        <div>
            <IoIosCloseCircleOutline
              onClick={() => setPopupedit(false)}
              className='text-danger fs-3 m-2 cursor-pointer' />
          </div>
          <div style={{display: toggleChange ? "none" : "block"}}>

          <div className="">
            <div className="d-flex justify-content-center align-items-center">
              <h2 className="text-white">Edit Profile</h2>
              
            </div>
            <div className="mx-3 d-flex flex-row justify-content-center">
              <div className="w-100">
                  <div className='d-flex justify-content-center'>
                  <img width={70} height={70} className='rounded-circle mb-2' 
                  src={img ? URL.createObjectURL(img) : (profile?.avatar && profile.avatar.length > 50) ? profile?.avatar  : profileImg} alt="" />
                  </div>
                  <input type="file" onChange={(e) => setImg(e.target.files[0])} className='w-100 p-2 mb-2 custom-border rounded-3 text-white' name="" id="" />
                  <input style={{background:'#09090b'}} className='w-100 p-2 mb-2 custom-border rounded-3 text-white' type="text" name="name" value={editedProfile.name} onChange={handleChange} />
                  <select style={{background:'#09090b'}} className='custom-border mb-2 w-100 p-2 text-white rounded-3' name="gender" value={editedProfile.gender} onChange={handleChange}>
                      <option hidden value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  <input style={{background:'#09090b'}} className='custom-border w-100 mb-2 p-2 text-white rounded-3'  type="text" name="phone" value={editedProfile.phone} onChange={handleChange} />
                <div className="forget-password text-center mt-2">Change password? <a><span className='text-primary text-decoration-underline' onClick={() => setToggleChange(!toggleChange)}>Click Here!!!</span></a></div><br />
                <div className='d-flex justify-content-center'>
                <button onClick={handleSubmit} style={{background:'#09090b'}} className='w-25 p-2 mb-2 custom-border custom-btn rounded-3 text-white'>Save</button>
                </div>
              </div>

            </div>
          </div>
          </div>
          <div className='w-100' style={{display: toggleChange ? "block" : "none"}}>
            <div className='w-100 mb-3 d-flex flex-column p-3 gap-3 text-nowrap justify-content-center '>
              <h3 className='text-center text-white'>Change Password</h3>
                  <input
                  className='w-100 p-2 mb-2 custom-border rounded-3 text-white bg-transparent'
                  placeholder='Old Password'
                  onChange={(e) => collectData(e)}
                   type="text" name="old_password"   />
                  <input
                  placeholder='New password'
                  className='w-100 p-2 mb-2 custom-border rounded-3 text-white bg-transparent'
                  onChange={(e) => collectData(e)}
                   type="text" name="password"  />
                  <input
                  placeholder='Confirm new password'
                   className='w-100 p-2 mb-2 custom-border rounded-3 text-white bg-transparent'
                  onChange={(e) => collectData(e)}
                   type="text" name="confirm_password"  />
                               <div className="forget-password d-flex justify-content-center mb-2">Update Profile? <a><span className='text-primary text-decoration-underline' onClick={() => setToggleChange(!toggleChange)}>Click Here!!!</span></a></div>
                <div className='d-flex justify-content-center'>
                <button className='btn text-white custom-btn custom-border w-25' onClick={handleChangePass} >Save</button>
                </div>

            </div>
          </div>
        </div>
        {
          error && <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 4 }} className="w-25 bg-danger text-white text-center p-2 rounded ">
            {error}
          </div>
        }
      </div>
    </div>
  );
};

export default Editprofile;

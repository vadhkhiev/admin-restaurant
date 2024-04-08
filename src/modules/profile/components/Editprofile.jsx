import React, { useState, useEffect } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from 'axios';
import "./Editprofile.css";
import { useSelector } from 'react-redux';
import profileImg from '../../../assets/img/avatar.jpg'
import useCurrentUser from '../../usermanangement/core/action';

const Editprofile = ({ setPopupedit, profile, setRefetch}) => {
  const [editedProfile, setEditedProfile] = useState({
    "name": profile?.name,
    "gender": profile?.gender,
    "phone": profile?.phone,
    "avatar": profile?.avatar
  });
  const token = useSelector(state => state.auth.token) || localStorage.getItem('token')
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [img, setImg] = useState(null)
  const {fetchCurrentUser} = useCurrentUser()
  const [toggleChange, setToggleChange] = useState(false)
  const [password , setPassword] = useState({
    "oldPassword": "",
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
  
    // Perform password validation when any password-related field changes
    if (name === 'confirm_password' && value !== password.password) {
      setError('Passwords do not match');
    } else {
      setError('');
    }
  };
  
  const handleChangepw = async () => {
    // Check if all password-related fields are filled
    if (password.oldPassword && password.password && password.confirm_password) {
      try {
        const response = await axios.patch(
          '/api/user/password/reset',
          password
        );
        setMessage('Password changed successfully');
        setPassword({
          "oldPassword": "",
          "password": "",
          "confirm_password": ""
        });
        setToggleChange(false);
      } catch (error) {
        setError(error.response?.data?.message || 'An error occurred');
        console.error('Error changing password:', error);
      }
    } else {
      setError('Please fill in all password fields');
    }
  };
  
  

  const handleImg = () => {
    const formData = new FormData();
    formData.append('file', img);
    axios.post('/api/user/profile-avatar/token', formData)
      .then(response => {
        console.log(response.data);
        setRefetch(prev => !prev); // Toggle refetch state
        fetchCurrentUser()
      })
      .catch(error => {
        console.error('Error uploading image:', error);
      });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (img) {
      await handleImg();
    }
    try {
      const response = await axios.put(`/api/user/profile`, editedProfile);
      setRefetch(prev => !prev); 
      setMessage('Profile updated successfully');
      
      setTimeout(() => {
        setPopupedit(false);
      }, 1000);
    } catch (error) {
      setError(error.response.data.message);
      console.error('Error editing profile:', error);
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
          backgroundColor: "rgba(62,64,87, 0.35)",
          zIndex: 3,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div style={{ backdropFilter: "blur(10px)" }} className='w-50 border rounded-3 overflow-hidden'>
        <div>
            <IoIosCloseCircleOutline
              onClick={() => setPopupedit(false)}
              className='text-danger fs-3' />
          </div>
          <div style={{display: toggleChange ? "none" : "block"}}>

          <div className="container">
            <div className="headerd d-flex justify-content-center align-items-center">
              <div className="text">Edit Profile</div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <img className="imagee border" src={editedProfile?.avatar?.length > 50 ? editedProfile?.avatar : profileImg} alt="" />
                <input onChange={(e) => setImg(e.target.files[0])} type="file" name="" className="form-control w-75 form-control-sm" id="" />
              </div>
              <div className="inputs col-md-6 mt-5">
                <div className='input'>
                  <h5>Name:</h5>
                  <input type="text" name="name" value={editedProfile.name} onChange={handleChange} />
                </div>
                <div className='input'>
                  <h5 className='w-25'>Gender:</h5>
                  <div className='p-1 w-75'>
                    <select className='form-select w-100 bg-transparent' name="gender" value={editedProfile.gender} onChange={handleChange}>
                      <option hidden value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className='input'>
                  <h5>Phone:</h5>
                  <input type="text" name="phone" value={editedProfile.phone} onChange={handleChange} />
                </div>
                <div className="forget-password">Change password? <a><span className='text-primary text-decoration-underline' onClick={() => setToggleChange(!toggleChange)}>Click Here!!!</span></a></div><br />
              </div>
              <div className='submit'>
                <button className='btn text-white' onClick={handleSubmit} style={{ background: '#3048a5' }}>Save</button>
              </div>
            </div>
          </div>
          </div>
          <div className='w-100' style={{display: toggleChange ? "block" : "none"}}>
            <div className='w-100 mb-3 d-flex flex-column gap-3 text-nowrap justify-content-center '>
               <div>
                <h4 className='text text-center'>Change Password</h4>
               </div>
               <div className='input'>
                  <h5>Old Password:</h5>
                  <input
                  onChange={(e) => collectData(e)}
                   type="text" name="old_password"   />
                </div>
                <div className='input'>
                  <h5>New Password:</h5>
                  <input
                  onChange={(e) => collectData(e)}
                   type="text" name="password"  />
                </div>
                <div className='input'>
                  <h5>Confirm Password:</h5>
                  <input
                  onChange={(e) => collectData(e)}
                   type="text" name="confirm_password"  />
                </div>
                <div className='d-flex justify-content-center'>
                <button className='btn text-white' onClick={handleChangepw} style={{ background: '#3048a5' }}>Save</button>
                </div>

            </div>
            <div className="forget-password d-flex justify-content-center">Update Profile? <a><span className='text-primary text-decoration-underline' onClick={() => setToggleChange(!toggleChange)}>Click Here!!!</span></a></div><br />
          </div>
        </div>
        {
          message && <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', zIndex: 4 }} className="w-25 bg-success text-white text-center p-2 rounded ">
            {message}
          </div>
        }
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

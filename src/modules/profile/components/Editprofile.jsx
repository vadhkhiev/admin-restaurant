import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import axios from 'axios';
import "./Editprofile.css";
import { useSelector } from 'react-redux';

const Editprofile = ({ setPopupedit, profile ,setRefetch  ,refetch}) => {
  const [editedProfile, setEditedProfile] = useState({
    "name": profile?.name,
    "gender": profile?.gender,
    "phone": profile?.phone,
    "avatar": profile?.avatar
});
  const token = useSelector(state => state.auth.token) || localStorage.getItem('token')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProfile(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/user/profile`, editedProfile,
      {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setRefetch(!refetch)
      // Handle success, maybe show a success message or update local state
      console.log(response.data);
      setPopupedit(false); // Close the popup after successful edit
    } catch (error) {
      // Handle error, maybe show an error message
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
          height: "105%",
          backgroundColor: "rgba(62,64,87, 0.35)",
          zIndex: 3,
        }}
        className="d-flex justify-content-center align-items-center"
      >
        <div style={{ backdropFilter: "blur(10px)" }} className='w-50 h-50 border rounded-3'>
          <div>
            <IoIosCloseCircleOutline
              onClick={() => setPopupedit(false)}
              className='text-danger fs-3' />
          </div>
          <div className="container">
            <div className="headerd d-flex justify-content-center align-items-center">
              <div className="text">Edit Profile</div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <img className="imagee border" src={editedProfile.avatar} alt="" />
              </div>
              <div className="inputs col-md-6 mt-5">
                <div className='input'>
                  <h5>Username:</h5>
                  <input type="text" name="name" value={editedProfile.name} onChange={handleChange} />
                </div>
                <div className='input'>
                  <h5>Gender:</h5>
                  <input type="text" name="gender" value={editedProfile.gender} onChange={handleChange} />
                </div>
                <div className='input'>
                  <h5>Phone:</h5>
                  <input type="text" name="phone" value={editedProfile.phone} onChange={handleChange} />
                </div>
                <div className="forget-password">Forget password? <span><a href="">Click Here!!!</a></span></div><br />
                
              </div>
              <div className='submit'>
                  <button className='btn text-white' onClick={handleSubmit} style={{ background: '#3048a5', height:'35px' }}>Edit Profile</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editprofile;

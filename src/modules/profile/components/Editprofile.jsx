import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from "react-icons/io";
import "../css/Editprofile.css";
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
  const { handleImg , handleEditProfile ,handleChangePw} = useCurrentUser();
  const [toggleChange, setToggleChange] = useState(false)
  const [password , setPassword] = useState({
    "old_password": "",
    "password": "",
    "confirm_password": ""
  })

  console.log(password)

  

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
    if (img) {
      handleImg(img);
    }
    try {
      handleEditProfile(editedProfile , img);
      setTimeout(() => {
        setPopupedit(false);
      }, 1000);
    } catch (error) {
      setError(error);
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
              <div className="textzz">Edit Profile</div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <img className="imagee border" src={editedProfile?.avatar?.length > 50 ? editedProfile?.avatar : profileImg} alt="" />
                <input onChange={(e) => setImg(e.target.files[0])} type="file" name="" className="form-control w-75 form-control-sm" id="" />
              </div>
              <div className="inputs col-md-6 mt-5">
                <div className='inputzz'>
                  <h5>Name:</h5>
                  <input type="text" name="name" value={editedProfile.name} onChange={handleChange} />
                </div>
                <div className='inputzz'>
                  <h5 className='w-25'>Gender:</h5>
                  <div className='p-1 w-75'>
                    <select className='form-select w-100 bg-transparent' name="gender" value={editedProfile.gender} onChange={handleChange}>
                      <option hidden value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </div>
                </div>
                <div className='inputzz'>
                  <h5>Phone:</h5>
                  <input type="text" name="phone" value={editedProfile.phone} onChange={handleChange} />
                </div>
                <div className="forget-password">Change password? <a><span className='text-primary text-decoration-underline' onClick={() => setToggleChange(!toggleChange)}>Click Here!!!</span></a></div><br />
              </div>
              <div className='submitzz'>
                <button className='btn text-white' onClick={handleSubmit} style={{ background: '#3048a5' }}>Save</button>
              </div>
            </div>
          </div>
          </div>
          <div className='w-100' style={{display: toggleChange ? "block" : "none"}}>
            <div className='w-100 mb-3 d-flex flex-column gap-3 text-nowrap justify-content-center '>
               <div>
                <h4 className='textzz text-center'>Change Password</h4>
               </div>
               <div className='inputzz'>
                  <h5>Old Password:</h5>
                  <input
                  onChange={(e) => collectData(e)}
                   type="text" name="old_password"   />
                </div>
                <div className='inputzz'>
                  <h5>New Password:</h5>
                  <input
                  onChange={(e) => collectData(e)}
                   type="text" name="password"  />
                </div>
                <div className='inputzz'>
                  <h5>Confirm Password:</h5>
                  <input
                  onChange={(e) => collectData(e)}
                   type="text" name="confirm_password"  />
                </div>
                <div className='d-flex justify-content-center'>
                <button className='btn text-white' onClick={handleChangePass} style={{ background: '#3048a5' }}>Save</button>
                </div>

            </div>
            <div className="forget-password d-flex justify-content-center">Update Profile? <a><span className='text-primary text-decoration-underline' onClick={() => setToggleChange(!toggleChange)}>Click Here!!!</span></a></div><br />
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

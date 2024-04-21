import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import Editprofile from './Editprofile';
import profileImg from '../../../assets/img/avatar.jpg'
import { IoMdMail } from "react-icons/io";
import { IoMdMale } from "react-icons/io";
import { IoMdFemale } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { PiIdentificationCardFill } from "react-icons/pi";
import { FaPhone, FaSackDollar } from "react-icons/fa6";
import useCurrentUser from '../core/action';
const Profile = () => {
    const {getCurrentUser} = useCurrentUser(); 
    const [popupedit , setPopupedit] = useState(false)
    const profile = useSelector((state) => state.currentUser.currentUser);
    
  useEffect(() => {  
    getCurrentUser();
  }, []);


  return (
    <div >
      <h3 className='ms-3 mt-3 fw-bold text-white' >User Profile</h3>
      {
        popupedit ? <Editprofile  setPopupedit={setPopupedit} profile={profile}/> : null 
      }
      <form className='mx-3 custom-border rounded-3 pb-4 mt-3 p-2 emp-profile'>
        <div className='row'>
          < div className="col-md-4">
            <img className="imagezz border"src={profile?.avatar?.length > 50 ? profile?.avatar : profileImg} alt=""/>
          </div>
          <div className='col-md-6 mt-5'>
            <div className=''>
              <h1 className='text-white'><b>{profile?.name}</b></h1>
              <h3>{profile?.username}</h3>
              <div className='mt-3 about-info'>
                <div className="row">
                  <div className="col-md-6 text-white">
                   <IoMdMail className='fs-3 me-2'/>
                    <label>Email</label>
                  </div>
                  <div className="col-md-6 text-white">
                    <p>{profile?.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 text-white">
                    {profile?.gender === "Male" ? <IoMdMale className='fs-3 me-2'/> : <IoMdFemale className='fs-3 me-2'/>}
                    <label>Gender</label>
                  </div>
                  <div className="col-md-6 text-white">
                    <p>{profile?.gender}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 text-white">
                    <FaPhone className='fs-4 me-2'/>
                    <label>Phone</label>
                  </div>
                  <div className="col-md-6 text-white">
                    <p>{profile?.phone}</p>
                  </div>
                </div>
                <div className="row text-white">
                  <div className="col-md-6">
                  <FaCalendarAlt className='fs-4 me-2'/>
                    <label>Hire Date</label>
                  </div>
                  <div className="col-md-6 text-white">
                    
                    <p>{(profile?.hireDate?.slice(0,10))}</p> 
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 text-white">
                    <PiIdentificationCardFill className='fs-3 me-2'/>  
                    <label>ID</label>
                  </div>
                  <div className="col-md-6 text-white">
                    <p>{profile?.id}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 text-white">
                    <FaSackDollar className='fs-4 me-2'/>
                    <label>Salary</label>
                  </div>
                  <div className="col-md-6 text-white">
                    <p>${profile?.salary}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-2 mt-5'> 
            <button className='btn text-white custom-btn custom-border'
            onClick={(e)=>{
              e.preventDefault();
              setPopupedit(true)
            }}
             >Edit Profile</button>
          </div> 
       </div>
      </form>
    </div>
  );
}

export default Profile;

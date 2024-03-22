import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import "./Profile.css";


const Profile = () => {
    const [profile, SetProfile] = useState({});
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

  useEffect(() => {  
    fetch('/api/user/profile', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => { return response.json()})
    .then(data => {
      console.log(data.data)
      SetProfile(data.data)
    }

    )
    .catch(error => console.error('Error:', error));
  }, []); 

  return (
    <div className='container emp-profile'>
      <form method="">
        <div className='row'>
          < div className="col-md-4">
            <img className="image"src={profile.avatar} alt=""/>
          </div>
          <div className='col-md-6 mt-5'>
            <div className='profile-head'>
              <h1 className='profile-head'><b>{profile.name}</b></h1>
              <h3>{profile.username}</h3>
              <h3>{profile.phone}</h3>

              <ul className="nav nav-tabs" role='tablist'>
              <li className="nav-item">
                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role='tab'>About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role='tab'>Timeline</a>
              </li>
              </ul>
              <div className='mt-3 about-info'>
                <div className="row">
                  <div className="col-md-6">
                    <label>Email</label>
                  </div>
                  <div className="col-md-6">
                    <p>{profile.email}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Gender</label>
                  </div>
                  <div className="col-md-6">
                    <p>{profile.gender}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>HireDate</label>
                  </div>
                  <div className="col-md-6">
                    <p>{profile.hireDate}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>ID</label>
                  </div>
                  <div className="col-md-6">
                    <p>{profile.id}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Salary</label>
                  </div>
                  <div className="col-md-6">
                    <p>{profile.salary}</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <label>Status</label>
                  </div>
                  <div className="col-md-6">
                    <p>{profile.status}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-2 mt-5'> 
            <input type="submit" className='profile-edit-btn' name='btnAddMore' value="Edit Profile" />
          </div>
       </div>
      </form>
    </div>
  );
}

export default Profile;

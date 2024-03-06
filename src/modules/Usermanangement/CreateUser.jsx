import React, { useState, useEffect } from 'react';
import Inputfield from './components/Inputfield';
import kiloIt from '../../assets/img/Profile-Avatar-PNG.png'
import { createUser } from './core/createruser';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const CreateUser = () => {
  const navigate = useNavigate()
   const tokens = useSelector((state) => state.auth.token)
   const roles = useSelector(state => state.roles.roles);
  
  const initialUserData = {
    name: '',
    username: '',
    gender: 'Male',
    avatar: 'avatar',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    salary: 0,
    hireDate: '',
    role_id: null,
  };

  const [userData, setUserData] = useState(initialUserData);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  

  useEffect(() => {
    const currentDateTime = new Date();
    const formattedDate = currentDateTime?.toISOString();

      setUserData({
        ...userData,
        hireDate: formattedDate,
        role_id: roles[0].id,
      });
  }, []);




  const handleInputChange = (field, value) => {
    setUserData({
      ...userData,
      [field]: value,
    });
  };

  const isEmailValid = (email) => {
    // Regular expression for basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    } else {
      setError('');
      return true;
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
     /* checking condition */
    for (const key in userData) {
      if (userData[key] === '') {
        setError(`Please fill in all the required fields.`);
        return;
      }
    }

    if (!isEmailValid(userData.email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword()) {
      return;
    }
    /* end of checking condition */

    try {
      const token = tokens || localStorage.getItem('token');  
      const response = await createUser(userData, token);
      
      // Simulate a successful user creation
      setSuccessMessage(response.data);


      // Reset the form after successful submission
      resetForm();
    } catch (error) {
      // Handle error (e.g., display an error message)
      setError('Failed to create user. Please try again.');
      console.error(error);
    }
  };

  const resetForm = () => {
    setUserData({
      ...initialUserData,
      email: '', 
    });
    setSuccessMessage('User created successfully!');
    setError('');
    setUserData(initialUserData);
    setTimeout(() => {
      setSuccessMessage('');
      navigate(-1);
    }, 1200);
  };


  return (
    <div>
      <form className='m-3 bg-white rounded'>
        <div className='p-2'>
          <div className='m-2'>
            <h2>Create user</h2>
            <div>
              <div className='w-100 d-flex justify-content-center'>
                <div>
                  <p>Avatar</p>
                  <img src={kiloIt} width={50} height={50} alt="" />
                </div>
              </div>
              <div className='w-50 d-flex flex-column mt-3'>
                <div className='d-flex'>
                  <label>Hired Date</label>
                </div>
                <input
                  className='text-center'
                  type="date"
                  id="datetime"
                  value={userData?.hireDate?.slice(0, 10)}
                  onChange={(e) => {
                    const currentDate = new Date();
                    const currentTime = currentDate?.toISOString().slice(11, 19); // Extract time part from ISO string
                    const formattedDateTime = e.target.value + 'T' + currentTime + 'Z';
                    handleInputChange('hireDate', formattedDateTime);
                  }}
                />
              </div>
            </div>

            {/* name and username */}

            <Inputfield
              action1={(e) => handleInputChange('name', e.target.value)}
              action2={(e) => handleInputChange('username', e.target.value)}
              obj={{ label1: "Name", label2: "Username", type: "text" }}
            />

            {/* email */}

            <div className="input-group flex-nowrap gap-3 mt-3">
              <div className='w-50 d-flex flex-column'>
                <div className='d-flex'>
                  <label>Email</label><span className='text-danger'>*</span>
                </div>
                <input
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  type="text"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className='w-50 d-flex flex-column'>
                <div className='d-flex'>
                  <label>Gender</label><span className='text-danger'>*</span>
                </div>
                <select
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="form-select form-select-md"
                  aria-label=".form-select-sm ">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* role */}

            <div className='w-100 mt-3'>
              <div>
                <label>Role</label><span className='text-danger'>*</span>
              </div>
               <select
                onChange={(e) => handleInputChange('role_id', parseInt(e.target.value))}
                className="form-select form-select-md"
                aria-label=".form-select-sm ">
                 {
                  roles.map((role) => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))
                } 
              </select> 
            </div>

            {/* password */}

            <Inputfield
              action1={(e) => handleInputChange('password', e.target.value)}
              action2={(e) => handleInputChange('confirmPassword', e.target.value)}
              obj={{ type: "password", label1: "Password", label2: "Confirm Password" }}
            />

            {/* salary and phone */}
            <Inputfield
              action1={(e) => handleInputChange('salary', parseInt(e.target.value))}
              action2={(e) => handleInputChange('phone', e.target.value)}
              obj={{ type: "number", label1: "Salary", label2: "Phone" }}
            />
            {error && <p className="text-danger">{error}</p>}
            {successMessage && (
          <div style={{ background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb', borderRadius: '0.25rem', padding: '0.75rem 1.25rem', margin: '1rem 0' }}>
            {successMessage}
          </div>
        )}

            <div className='d-flex justify-content-center mt-3'>
              <button type="button" onClick={handleSubmit} className='btn btn-primary'>Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateUser;

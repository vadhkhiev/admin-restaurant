import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';


const Pathbtn = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter((segment) => segment !== '');

  const handleNavigation = (index) => {
    const targetPath = `/${pathSegments.slice(0, index + 1).join('/')}`;
    navigate(targetPath);
  };

  return (
    <div className='breadcrumb-container mt-3 mx-3'>
      <button onClick={() => navigate(-1)} className='breadcrumb-icon-button'>
        <IoIosArrowBack className='breadcrumb-icon' />
      </button>
      {pathSegments.map((segment, index) => (
        <React.Fragment key={index}>
          {index > 0 && <p className='breadcrumb-icon'>/</p>}
          <button onClick={() => handleNavigation(index)} className='breadcrumb-button text-dark'>
            {segment}
          </button>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Pathbtn;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Checkbox = () => {
  const id = useSelector((state) => state.id?.id);
  const [error , setError] = useState('');
  const [message , setMessage] = useState('')


return (
    <>
    
      {
          message && <div style={{position:'fixed', top:'20px', left:'50%', transform:'translateX(-50%)', zIndex:4}} className="w-25 bg-success text-white text-center p-2 rounded ">
                {message}
              </div>
      }
      {
          error && <div style={{position:'fixed', top:'20px', left:'50%', transform:'translateX(-50%)', zIndex:4}} className="w-25 bg-danger text-white text-center p-2 rounded ">
                {error}
         </div>
      }
    </>
  );
};

export default Checkbox;

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import getPermission from '../core/getPermission';
import loadinggif from '../../../assets/img/loading.gif'
import updatePermission from '../core/updatePermission';
const Checkbox = () => {
  
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const id = useSelector((state) => state.id?.id);

  const [fetchedData, setFetchedData] = useState([]);
  const [updatedData, setUpdatedData] = useState([]);
  const [loading , setLoading] = useState(true)
  const [error , setError] = useState('');
  const [message , setMessage] = useState('')
  const [refresh , setRefresh] = useState(false)
  const [defaultData , setDefaultData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPermission(token, id);
        setFetchedData(result.data.permissions);
        setDefaultData(result.data.permissions);
        console.log(result.data.permissions);
        setLoading(false)
        setError('');
      } catch (error) {
        console.error(error);
        setError(error.response.data.message);
      }
    };
    fetchData();
  }, [refresh]);

  useEffect(() => {
    if (message || error) {
      setTimeout(() => {
        setMessage('');
        setError('');
      }, 3000);
    }
  }, [message,error]);

  useEffect(() => {
    setUpdatedData(fetchedData?.map((item)=>{
      return {
        permissionId : item.id,
        status: item.status === 1 ? true : false
      }
    }));
  }, [fetchedData]);

  const handleSave = async () => {

    //convert to legit data
    setUpdatedData(fetchedData?.map((item)=>{
      return {
        permissionId : item.id,
        status: item.status === 1 ? true : false
      }
    }));

   try {
      const result = await updatePermission(token, id, updatedData); 
      setMessage(result.message);
      setError('');
      setRefresh(!refresh);
    } catch (error) {
      console.error(error);
      setError(error.response.data.message);
    } 
  };
  const handleReset =()=>{
    setFetchedData(defaultData);
  }

return (
    <>
    {
      loading ? <div className='text-center p-3 '>loading...
      <img width={25} src={loadinggif} alt="" />
      </div> : 
      <div>
      <div className='p-2'>
        {fetchedData?.map((item) => (
          <div key={item.id} style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',background:'#6c738f'}} className='d-flex justify-content-between  align-items-center p-2 m-2 rounded-3 bg-light'>
            <div>{item.name}</div>
            <div className='form-check form-switch'>
              <input
                className='form-check-input'
                type='checkbox'
                value={item.status}
                checked={item.status === 1}
                onChange={() => {        
                  setFetchedData(prevData => prevData.map(i => {
                    if(i.id === item.id) return { ...i, status: i.status === 1 ? 0 : 1 };
                    return i;
                  }));
                }}
                
              />
              <label className='form-check-label'>Permission</label>
            </div>
          </div>
        ))}
        <div className='d-flex justify-content-end p-3'>
          <button onClick={handleSave} className='btn btn-primary'>Save</button>
          <button onClick={() => handleReset()} className='btn btn-danger ms-3'>Reset</button>
        </div>
      </div>
      </div>
    }
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

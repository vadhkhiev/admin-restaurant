import React, { useEffect, useState } from 'react'
import Table from './components/Table'
import { useDispatch, useSelector } from 'react-redux';
import Createrole from './components/Createrole';
import UpdateRole from './components/UpdateRole';
import getroles from '../layout/core/getroles';
import { storeRoles } from '../layout/core/roleSlice';



const Role = () => {
    const pagingdetails = useSelector((state) => state.roles.paging);
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const permission = useSelector((state) => state.permission?.permission?.data?.permissions); 
    const [add , setAdd] = useState(false);
    const [update,setUpdate] = useState(false);
    const dispatch = useDispatch(); 
    
    const handleAdd = ()=>{
      setAdd(!add)
    }

    // refetch data from server to make it fresh 

    useEffect(()=>{
        const fetchData = async () => {
          try {
            const result = await getroles(token);
            dispatch(storeRoles(result)) 
          }
          catch (error) {
            console.error( error);
          }
        };
        fetchData();
      
    },[])
    

  return (
    <>
    {add && <Createrole setAdd={setAdd}/>}
    {update && <UpdateRole setUpdate={setUpdate}/>}

        <div className='m-5'>
        <div className='d-flex mb-3 justify-content-between'>
            <div className='d-flex'>
              <h3 style={{color:'#45495c'}} className='fw-bold d-flex align-items-center me-3'>Roles</h3>
              {
                (permission ?.find((per) => per.name == 'create-role'))?.status === 1 
                && 
                <button onClick={handleAdd} className='btn text-white' style={{background:'#6c738f'}}>Add</button>
              }
              
            </div>
            <div className='d-flex align-items-center rounded' style={{background:'#6c738f'}}>
                <div  className='d-flex px-3' >
                    <span className='text-nowrap text-white pe-2'>
                        Total roles :  <span>{pagingdetails?.totals}</span>
                    </span>
                    <div>
                </div>
                </div>
            </div>
        </div>
        <div >
            <Table setUpdate={setUpdate}/>
        </div>
    </div>
    </>
  )
}

export default Role
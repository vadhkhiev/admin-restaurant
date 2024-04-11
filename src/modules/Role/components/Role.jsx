import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useSelector } from "react-redux";
import Createrole from "./Createrole";
import UpdateRole from "./UpdateRole";
import useRoles from "../core/action";

const Role = () => {
    const pagingdetails = useSelector((state) => state.roles.paging);
    const {userPermission} = useSelector((state) => state.auth); 
    const { getRoles } = useRoles();
    const [add , setAdd] = useState(false);
    const [update,setUpdate] = useState(false);
    const [page , setPage ] = useState(1)
    
    
    
    const handleAdd = ()=>{
      setAdd(!add)
    }

    useEffect(()=>{
      getRoles()
    },[])

  return (
    <>
      {add && <Createrole setAdd={setAdd} />}
      {update && <UpdateRole setUpdate={setUpdate} />}

        <div className='m-5'>
        <div className='d-flex mb-3 justify-content-between'>
            <div className='d-flex'>
              <h3 style={{color:'#45495c'}} className='fw-bold d-flex align-items-center me-3'>Roles</h3>
              {
                (userPermission ?.find((per) => per.name == 'create-role'))?.status === 1 
                && 
                <button onClick={handleAdd} className='btn text-white' style={{background:'#6c738f'}}>Add</button>
              }
              
            </div>
            <div className='d-flex'>
              <div style={{width:'120px'}} className='d-flex justify-content-center align-items-center me-3'>
              <div className='d-flex justify-content-center align-items-center me-2 w-25'>Show</div>
               <span className='p-0 d-flex justify-content-center w-75'>  
               <select
                /* onChange={(e) => setSize(parseInt(e.target.value))}  */
                className="form-select form-select-sm w-100" aria-label=".form-select-sm example">
                  <option  value="20" selected>20</option>
                  <option value="30">30</option>
                  <option value="50">50</option>
                </select>
               </span>
              </div>
              <div className='d-flex align-items-center rounded' style={{background:'#6c738f'}}>
                  <div  className='d-flex px-3' >
                    <span>
                    </span>
                      <span className='text-nowrap text-white pe-2'>
                          Total roles :  <span>{pagingdetails?.totals ? pagingdetails?.totals : 0 }</span>
                      </span>
                      <div>
                  </div>
                  </div>
            </div>
            </div>
        </div>
        <div >
            <Table  setPage={setPage}  page={page}   setUpdate={setUpdate}/>
        </div>
      </div>
    </>
  );
};

export default Role;

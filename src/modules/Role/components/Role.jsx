import React, { useEffect, useState } from "react";
import Table from "./Table";
import { useSelector } from "react-redux";
import Createrole from "./Createrole";
import useRoles from "../core/action";
import Pagination from "../../utils/components/Pagination";
import SearchBar from "../../utils/components/SearchBar";
const Role = () => {
    const pagingdetails = useSelector((state) => state.roles.paging);
    const {userPermission} = useSelector((state) => state.auth); 
    const {params } = useSelector((state) => state.roles);
    const { getRoles , handleFilter } = useRoles();
    const [add , setAdd] = useState(false);
    const [update,setUpdate] = useState(false);

    const handleAdd = ()=>{
      setAdd(!add)
    }
    
    useEffect(()=>{
      getRoles()
    },[params])

  return (
    <>
      {add && <Createrole setAdd={setAdd} action={'create'}/>}
      {update && <Createrole setUpdate={setUpdate} action = {'update'} />}

        <div className='m-3 custom-border p-3 rounded-3'>
          <h2 className="text-white fw-bold">Role list</h2>
          <p className="text-white-50">Here are the list of roles</p>
        <div className=' mb-3 d-flex'>
              <div className="w-50 ">
                <SearchBar params={params} handleFilter={handleFilter} />
              </div>
            <div className='d-flex justify-content-end w-50'>
            {
                (userPermission ?.find((per) => per.name == 'create-role'))?.status === 1 
                && 
                <button onClick={handleAdd} className='btn custom-btn text-white custom-border' >Add</button>
              }

            </div>
        </div>
        <div >
            <Table  setUpdate={setUpdate}/>
            
            {/* pagination */}
            <Pagination params={params} pagingdetails={pagingdetails} handleFilter={handleFilter} />

        </div>
      </div>
    </>
  );
};

export default Role;

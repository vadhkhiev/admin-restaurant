import React, { useEffect } from "react";
import Table from "./Table";
import { useDispatch, useSelector } from "react-redux";
import Createrole from "./Createrole";
import useRoles from "../core/action";
import Pagination from "../../utils/components/Pagination";
import SearchBar from "../../utils/components/SearchBar";
import Reset from "../../utils/components/Reset";
import { storeCreateToggle } from "../core/reducer";
const Role = () => {
    const pagingdetails = useSelector((state) => state.roles.paging);
    const {userPermission} = useSelector((state) => state.auth); 
    const {params } = useSelector((state) => state.roles);
    const { getRoles , handleFilter } = useRoles();
    const {createToggle , updateToggle } = useSelector((state) => state.roles);
    const dispatch = useDispatch();

    
    useEffect(()=>{
      getRoles()
    },[params])

  return (
    <>
        {createToggle && <Createrole  action={'create'}/>}
        {updateToggle && <Createrole  action = {'update'} />}
        <div className='m-3 custom-border p-3 rounded-3'  >
          <h2 className="text-white fw-bold">Role list</h2>
          <p className="text-white-50">Here is the list of roles</p>
        <div className=' mb-3 d-flex'>
            <div className="w-50 d-flex">
                <SearchBar params={params} handleFilter={handleFilter} />
                <Reset params={params} handleFilter={handleFilter} />
            </div>
            <div className='d-flex justify-content-end w-50'>
            {
                (userPermission?.find((per) => per.name === 'create-role'))?.status === 1 
                && 
                <button onClick={()=>dispatch(storeCreateToggle(true))} className='btn custom-btn text-white custom-border' >Add</button>
              }

            </div>
        </div>
        <div >
            <Table/>
            
            {/* pagination */}
            <Pagination params={params} pagingdetails={pagingdetails} handleFilter={handleFilter} />

        </div>
      </div>
    </>
  );
};

export default Role;

import  getroles  from '../../layout/core/getroles';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Filterbar = ({setSortby ,setOrderby , orderby , sortby , selectRole , setSelectRole , setLimit  }) => {
    const [roles , setRoles] = useState([])
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getroles( );
                setRoles(result.data);

            } catch (error) {
                console.error('Error in component:', error);
            }
        }
        fetchData();

    },[])
    
   

  return (
    <>
    <div className='d-flex justify-content-evenly'>
    <div className='mx-3 '>
            <div>
                <select
                className="form-select py-0"
                aria-label="Default select example"
                onChange={(e) => {
                    setSortby(e.target.value);
                }}
                >
                <option key={0} value="">Sort by</option>
                <option key={1} value="name" {...(sortby === 'name' && {selected: true})}>Name</option>
                <option key={2} value="salary" {...(sortby === 'salary' && {selected: true})}>Salary</option>
                <option key={3} value="email" {...(sortby === 'email' && {selected: true})}>Email</option>
                </select>
            </div>
        </div>
        <div className='me-3'>
            <select
            onChange={(e) => {
                setOrderby(e.target.value);
            }}
            className="form-select py-0"
            aria-label="Default select example"
            >
            <option key={0} value="">Order by</option>
            <option key={1} value="asc" {...(orderby === 'asc' && {selected: true})}>Ascending</option>
            <option key={2} value="desc" {...(orderby === 'desc' && {selected: true})}>Descending</option>
            </select>
        </div>
        <div className='me-3'>
            <select
             onChange={(e) => {
                setSelectRole(e.target.value);
             }}
             name="" className="form-select py-0" id="">
                <option key={0} value="">Role</option>
                {
                    roles.map((r) => {
                        return <option key={r.id} value={r.id} {...(selectRole === r.id && {selected: true})}>{r.name}</option>
                    })
                }
            </select>

        </div>
        {/* show 10 */}
        <div>
            <select
            onChange={(e) => {
                setLimit(parseInt(e.target.value));
            }}
            className="form-select py-0"
            aria-label="Default select example"
            >
            <option key={0} value="20">Show 20</option>
            <option key={1} value="30">Show 30</option>
            <option key={2} value="50">Show 50</option>
            </select>

        </div>
    </div>
    </>
  )
}

export default Filterbar
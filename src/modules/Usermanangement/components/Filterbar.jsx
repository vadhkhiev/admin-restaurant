import  getroles  from '../../layout/core/getroles';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import useUsers from '../core/action';

const Filterbar = () => {
    const { setParams } = useUsers()
    const [roles , setRoles] = useState([])

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

    const collectParams = (e) => {
        const value = e.target.value
        const name = e.target.name
        setParams( {[name] : value})
    }

  return (
    <>
    <div className='d-flex justify-content-evenly'>
    <div className='mx-3 '>
            <div>
                <select
                className="form-select py-0"
                aria-label="Default select example"
                name='sort'
                onChange={(e) => { collectParams(e) }}
                >
                <option key={0} value="">Sort by</option>
                <option key={1} value="name">Name</option>
                <option key={2} value="salary" >Salary</option>
                <option key={3} value="email">Email</option>
                </select>
            </div>
        </div>
        <div className='me-3'>
            <select
            onChange={(e) => {
                collectParams(e)
            }}
            name='order'
            className="form-select py-0"
            aria-label="Default select example"
            >
            <option key={0} value="">Order by</option>
            <option key={1} value="asc" >Ascending</option>
            <option key={2} value="desc" >Descending</option>
            </select>
        </div>
{/*         <div className='me-3'>
            <select
             onChange={(e) => {
               collectParams(e)
             }}
             name="" className="form-select py-0" id="">
                <option key={0} value="">Role</option>
                {
                    roles.map((r) => {
                        return <option key={r.id} value={r.id} {...(selectRole === r.id && {selected: true})}>{r.name}</option>
                    })
                }
            </select>

        </div> */}
        {/* show 10 */}
        <div>
            <select
            onChange={(e) => {
                collectParams(e)
            }}
            name='size'
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
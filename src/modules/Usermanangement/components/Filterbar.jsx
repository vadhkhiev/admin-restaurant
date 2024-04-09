
import React from 'react'
import { useSelector } from 'react-redux';
import useUsers from '../core/action';

const Filterbar = () => {
    const { setParams } = useUsers()
    const roles = useSelector((state) => state.roles.roles)
    const {params} = useSelector((state) => state.users)

    const collectParams = (e) => {
        const value = e.target.value
        const name = e.target.name
        let newParams = { ...params, [name]: value }
        if (name === 'roleId') {
            newParams = { ...newParams, page: 1 }
        }
        setParams(newParams) 
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
                <option key={0}  value="">Sort by</option>
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
            <option key={0} hidden value="">Order by</option>
            <option key={1} value="asc" >Ascending</option>
            <option key={2} value="desc" >Descending</option>
            </select>
        </div>
        <div className='me-3'>
            <select
             onChange={(e) => {
               collectParams(e)
             }}
             name="roleId" className="form-select py-0" id="">
                <option key={0} hidden value="">Role</option>
                <option key={1} value="">All</option>
                {roles.map((role) => (
                    <option key={role.id + 1} selected={params.roleId == role.id} value={role.id}>
                        {role.name}
                    </option>
                ))}
            </select>

        </div> 
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
            <option key={0} value="20" selected={params.size == '20'}>Show 20</option>
            <option key={1} value="30" selected={params.size  === '30'}>Show 30</option>
            <option key={2} value="50" selected={params.size  === '50'}>Show 50</option> 
            </select>

        </div>
    </div>
    </>
  )
}

export default Filterbar
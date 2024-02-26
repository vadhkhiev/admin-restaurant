import React, { useEffect, useState } from 'react'
import Table from './components/Table'
import getalluser from './core/getalluser'
import loadingImg from '../../assets/img/loading.gif'

const User = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getalluser();
        setUsers(result.data.reverse());
        setLoading(false);
      } catch (error) {
        // Handle error
        console.error('Error in component:', error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
  <div className="container rounded bg-white m-3">
  {
    loading ? (
      <div  className='d-flex flex-row justify-content-center align-items-center'>
        <h4 style={{color:'#222E3C'}} >Loading...</h4><span><img src={loadingImg} width={20} alt="" /></span>
      </div>
    ):(
      <>
      <h2>User Management</h2>
       <Table users={users}/>
      </>
    )
    
  }
  </div>
</>
  )
}

export default User
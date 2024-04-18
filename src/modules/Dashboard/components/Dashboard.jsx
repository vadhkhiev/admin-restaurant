import React, { useEffect, useState } from 'react';
import Catebox from './Catebox';
import { FaUsers } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import PieCharts from './PieCharts';
import profile from '../../../assets/img/avatar.jpg';  
import LineChart from './LineChart';
import RadarChart from './RadarChart';
import axios from 'axios';
import useRoles from '../../Role/core/action';
import { useSelector } from 'react-redux';
import useUsers from '../../Usermanangement/core/action';

const Dashboard = () => {
  const [foodlist , setFoodlist] = useState([]);
  const [Allorders,setAllorders] = useState([]);
  const {getUsers} = useUsers();
  const { getRoles } = useRoles();
  const {paging , users} = useSelector((state) => state.users);
  const {roles } = useSelector((state) => state.roles);
  console.log(users)

  useEffect(() => {
    getRoles();
    getUsers();
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setAllorders(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchOrders();

    const fetchfood = async () => {
      try {
        const response = await axios.get('/api/foods');
        setFoodlist(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchfood();

  },[])

  return (
    <>
    <div className='container'>
      
      <main>
        <section className='row'>
          <aside className="col-12 row">
          <h2 className='text-white fw-bold mt-4 p-0'>Dashboard</h2>
            <div>
              
            </div>

            <section className='col-12 row mt-2 p-0'>
              <div className='col-6 col-md-3'>
                <Catebox title={'Users'} icon={<FaUsers />} num={paging?.totals || 0} color={'#09090b'} />
              </div>
              <div className='col-6 col-md-3'>
                <Catebox title={'Orders'} icon={<CiBoxes />} num={Allorders?.paging?.totals || 0} color={'#09090b'} />
              </div>
              <div className='col-6 col-md-3'>
                <Catebox title={'Foods'} icon={<IoFastFoodOutline />} num={foodlist?.data?.length || 0} color={'#09090b'} />
              </div>
              <div className='col-6 col-md-3'>
                <Catebox title={'Roles'} icon={<FaUsers />} num={roles?.length || 0} color={'#09090b'} />
              </div>
            </section>

              <div className="col-12 col-lg-7 mt-4 rounded-3 p-0">
                <LineChart />
              </div>

              <div className='col-12  col-lg-5 mt-4 rounded-3 '>
                <div className='custom-border rounded-3 p-3 ms-2'>
                  <h3 className='text-white'>Recent users</h3>
                  <p className='text-white-50'>there are a total of {paging?.totals} users</p>
                  {
                    users.slice(0, 5)?.map((user , index) => (
                      <div key={index} className=' rounded-3  mb-3 p-2' style={{  height: '45px' }}>
                        <div className='d-flex'>
                         <div className='d-flex'>
                         <img className='rounded-3 avatar rounded-circle border' width={35} height={35} src={user?.avatar?.length > 50 ? user?.avatar : profile} alt="" />

                          <p className='fw-bold text-white ms-3'>{user?.name}</p>
                           <p className='ms-3'>{user?.email}</p>
                         </div>
                           
                        </div>

                      </div>
                    ))
                  }
                </div>
              </div>

          </aside>
        </section>
      </main>
    </div>
    </>
  )
}

export default Dashboard;

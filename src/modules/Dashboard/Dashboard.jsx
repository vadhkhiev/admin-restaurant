import React, { useEffect, useState } from 'react'
import Catebox from './components/Catebox'
import { FaUsers } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { useSelector } from 'react-redux';
import PieCharts from './components/PieCharts';
import profile from '../../assets/img/avatar.jpg';	

const Dashboard = () => {
  const roles = useSelector((state) => state.roles.roles); 
  const foodlist = useSelector((state) => state.foodList.foodList);
  const Allusers = useSelector((state) => state.users.total);
  const Allorders = useSelector((state) => state.orders.orders);
  const recentUsers = useSelector((state) => state.users.recent);
  console.log(recentUsers);
  
  return (
    <>
    <div className='m-3 '>
    <section>
       <h3 style={{color:'#45495c'}} className='fw-bold d-flex align-items-center '>Dashboard</h3>
      </section>
        <main >
          <section className='row '>
           <aside  className="col-12 col-md-8 px-3 ">

            <section className='col-12 row pb-3' style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}}>
            <Catebox title={' Users'} icon={<FaUsers />} num={Allusers} color={'#6895a1'} />
            <Catebox title={'Orders'} icon={<CiBoxes />} num={Allorders} color={'#344955'} />
            <Catebox title={'Foods'} icon={<IoFastFoodOutline />} num={foodlist?.length} color={'#50727B'} />
            <Catebox title={' Roles'} icon={<FaUsers />} num={roles?.length} color={'#78A083'} />
            </section>

            <section style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}} className='col-12 col-md-6 px-3 mt-3 '>
              <h4 style={{color:'#45495c'}} className='fw-bold d-flex align-items-center '>Recently Created Users</h4>
              {
                recentUsers?.map((user , index) => {
                  return (
                    <div  style={{background: '#f5f5f5' , height: '55px'}} key={index} className='d-flex  justify-content-between rounded-3  mb-1 p-2'>
                      <div className='d-flex align-items-center'>
                        <img className='rounded-3' width={40} height={40} src={user?.avatar?.length > 50 ? user?.avatar : profile} alt="" />
                        <p className='fw-bold fs-5 ms-3'>{user?.name}</p>
                      </div>
                
                      <p style={{height: '20px' ,border: user?.status ? '1px solid green' : '1px solid green'}} className={` fs-6 px-1 rounded-pill pb-1${user?.status ? 'text-success' : 'text-danger' } `} >{user?.status ? 'Active ' : 'Inactive' }</p>
              
                    </div>
                  )
                })
              }
            </section>

           </aside>

           <aside className="col-12 col-md-4 row ">
            <div style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}} className="col-12 px-5 pb-5 rounded  justify-content-center ">
             <PieCharts  />
            </div>
           </aside>

          </section>
        </main>
    </div>

    </>
  )
}

export default Dashboard
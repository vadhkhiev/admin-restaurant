import React, { useEffect, useState } from 'react'
import Catebox from './components/Catebox'
import { FaUsers } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { useSelector } from 'react-redux';
import PieCharts from './components/PieCharts';
import profile from '../../assets/img/avatar.jpg';	
import dateTimeFormat from '../Role/core/dateTimeFormat';
import BarChart from './components/BarChart';

const Dashboard = () => {
  const roles = useSelector((state) => state.roles.roles); 
  const foodlist = useSelector((state) => state.foodList.foodList);
  const Allusers = useSelector((state) => state.users.total);
  const Allorders = useSelector((state) => state.orders.orders);
  const recentUsers = useSelector((state) => state.users.recent);


  const data = [
    { label: 'A', value: 10 },
    { label: 'B', value: 20 },
    { label: 'C', value: 15 },
    { label: 'D', value: 25 },
  ];
  

  console.log(Allorders);
  
  return (
    <>
    <div className='m-3 '>
    <section>
       <h3 style={{color:'#45495c'}} className='fw-bold d-flex align-items-center '>Dashboard</h3>
      </section>
        <main >
          <section className='row '>
           <aside  className="col-12 col-md-8 px-3 row ">

            <section className='col-12 row pb-3' style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}}>
            <Catebox title={' Users'} icon={<FaUsers />} num={Allusers - 1} color={'#6895a1'} />
            <Catebox title={'Orders'} icon={<CiBoxes />} num={Allorders?.paging?.totals} color={'#344955'} />
            <Catebox title={'Foods'} icon={<IoFastFoodOutline />} num={foodlist?.length} color={'#50727B'} />
            <Catebox title={' Roles'} icon={<FaUsers />} num={roles?.length - 1 } color={'#78A083'} />
            </section>
            <div className="col-12">
            <BarChart data={data} />
            </div>

            <section  className='col-12 col-md-6 px-3 mt-3 py-3 '>
              <div  >
              <h4 style={{color:'#45495c'}} className='fw-bold d-flex align-items-center '>Recent Users</h4>
              {
                recentUsers?.map((user , index) => {
                  return (
                  <div style={{ background: '#f5f5f5', height: '55px',boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }} key={index} className='d-flex justify-content-between rounded-3 align-items-center mb-1 p-2'>
                    <div className='d-flex align-items-center'>
                      <img className='rounded-3' width={40} height={40} src={user?.avatar?.length > 50 ? user?.avatar : profile} alt="" />
                      <p className='fw-bold fs-5 ms-3'>{user?.name}</p>
                    </div>

                      <p style={{border: user?.status ? '1px solid #c0c4ff' : '1px solid #fa6428' }} className={`fs-6 px-2  rounded-pill   ${user?.status ? 'text-success' : 'text-danger'}`}>{user?.status ? 'Active' : 'Inactive'}</p>
                  </div>

                  )
                })
              }
              </div>
            </section>

            <section  className='col-12 col-md-6 px-3 mt-3 py-3 '>
              <div  >
              <h4 style={{color:'#45495c'}} className='fw-bold d-flex align-items-center '>Recent Order</h4>
                 <div style={{ background: '#f5f5f5', height: '55px',boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}  className='d-flex justify-content-between rounded-3 align-items-center mb-1 p-2'>
                      <p className='fw-bold fs-5'>ID</p>
                      <p className='fw-bold fs-5'>Status</p>
                      <p className='fw-bold fs-5 ms-3'>Total</p>
                      <p className='fw-bold fs-5 ms-3'>Payment</p>
                  </div>
              {
                Allorders.data?.slice(0,4)?.map((order , index) => {
                  return (
                    <div style={{ background: '#f5f5f5', height: '55px',boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px' }}  className='d-flex justify-content-between rounded-3 align-items-center mb-1 p-2'>
                    <p className='fw-bold fs-5'>{order?.id}</p>
                    <p className={`fw-bold fs-5 px-2 ${order?.status ? 'text-danger' : 'text-success'}`}>{order?.status}</p>
                    <p className='fw-bold fs-5 ms-3'><sup>$</sup>{(order?.totalPrice)?.toFixed(2)}</p>
                    <p className='fw-bold fs-5 ms-3'>{order?.paymentMethod}</p>
                   </div>
                 

                  )
                })
              }
              </div>
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
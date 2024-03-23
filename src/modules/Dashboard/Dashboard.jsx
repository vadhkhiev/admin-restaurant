import React, { useEffect, useState } from 'react'
import Catebox from './components/Catebox'
import { FaUsers } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { CiBoxes } from "react-icons/ci";
import { useSelector } from 'react-redux';
import getUsers from '../Usermanangement/core/getUsers';

const Dashboard = () => {
  const roles = useSelector((state) => state.roles.roles); 
  const foodlist = useSelector((state) => state.foodList.foodList);
  const Allusers = useSelector((state) => state.users.total);
  const Allorders = useSelector((state) => state.orders.orders);

  
  return (
    <>
    <div className='m-3 '>
    <section>
       <h3 style={{color:'#45495c'}} className='fw-bold d-flex align-items-center me-3'>Dashboard</h3>
      </section>
        <main >
          <section className='row'>
            <Catebox title={' Users'} icon={<FaUsers />} num={Allusers} color={'#6895a1'} />
            <Catebox title={'Orders'} icon={<CiBoxes />} num={Allorders} color={'#344955'} />
            <Catebox title={'Foods'} icon={<IoFastFoodOutline />} num={foodlist?.length} color={'#50727B'} />
            <Catebox title={' Roles'} icon={<FaUsers />} num={roles?.length} color={'#78A083'} />
          </section>
        </main>
    </div>
    </>
  )
}

export default Dashboard
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Chart as ChartJS } from 'chart.js/auto';

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

const PieCharts = () => {
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token'); 
    const [data , setData ] = useState([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/sale_report_income/day?paymentStatus=Bank', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const response2 = await axios.get('/sale_report_income/day?paymentStatus=Cash', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const bankPrice = (response.data.data[0]?.totalPrice).toFixed(2);
                const cashPrice = (response2.data.data[0]?.totalPrice).toFixed(2);
                setData([ parseFloat(cashPrice) ,parseFloat(bankPrice) ]); 
            } catch (error) {
                console.error('Error fetching data:', error); 
            }
        }
        fetchData();
    }, []);

    const income = {
        labels: ['Cash' ,'Bank'],
        datasets: [{
            data: data,
            backgroundColor: [getRandomColor(), getRandomColor()]
        }]
    };

    return (
        <div style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}} className='mt-2 pb-2 pe-2'>
           <div className='d-flex justify-content-between'>
            <h4 style={{ color: '#45495c' }} className='fw-bold text-center'>This Month Income</h4>
            <p className='text-center fs-3 fw-bold'> <sup>$</sup> {(data[0] + data[1])? (data[0] + data[1]): 0 }</p>
           </div>
            <Pie data={income} />
        </div>
    );
}

export default PieCharts;

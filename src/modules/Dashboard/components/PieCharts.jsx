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
function formatMonthYear(month, year) {

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const monthName = monthNames[month - 1];
    const formattedDate = `${year}:${(month < 10 ? '0' : '') + month}`;

    return formattedDate;
}

const PieCharts = () => {
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token'); 
    const [data , setData ] = useState([]);
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1; 
    const currentYear = currentDate.getFullYear();
    const formattedDate = formatMonthYear(currentMonth, currentYear);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/report/income?paymentStatus=Bank&month=${formattedDate}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const response2 = await axios.get(`/report/income?paymentStatus=Cash&month=${formattedDate}`, {
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
            <p className='text-center fs-3 fw-bold'> <sup>$</sup> {(data[0] + data[1])? (data[0] + data[1]).toFixed(2): 0 }</p>
           </div>
            <Pie data={income} />
            <div className='mt-3'>
                <ul>
                    <li className='fw-bold list-unstyled mb-1'>Cash : <sup>$</sup><span className='fw-bold'>{data[0]}</span></li>
                    <li className='list-unstyled'>
                        <div style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}} className=' rounded border me-1 '>
                           <div className=' rounded text-center text-white' style={{ width: `${(data[0] / (data[0] + data[1]) * 100).toFixed(2)}%` , height: '100%',background:income.datasets[0].backgroundColor[0]}}>
                            { data[0] && data[1] ? (data[0] / (data[0] + data[1]) * 100)?.toFixed(2) : 0 } %
                           </div>
                        </div>
                     </li>
                    <li className='fw-bold list-unstyled'>Bank : <sup>$</sup>{data[1]} <span className='fw-bold'>
                        <div style={{boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px'}} className=' rounded border me-1 '>
                           <div className=' rounded text-center text-white' style={{ width: `${(data[1] / (data[0] + data[1]) * 100).toFixed(2)}%` , height: '100%',background:income.datasets[0].backgroundColor[1]}}>
                            {data[0] && data[1] ? (data[1] / (data[0] + data[1]) * 100).toFixed(2) : 0 } %
                           </div>

                        </div>
                    </span></li>
                </ul>
            </div>
        </div>
    );
}

export default PieCharts;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Radar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';

const RadarChart = () => {

    const [food, setFood] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [defaultValue, setDefaultValue] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
                const defaultDate = `${year}-${month}`;
                const reqDate = `${year}:${month}`;
                setDefaultValue(defaultDate);
                const result = await axios.get(`/report/food?foodTop5=top&month=${selectedMonth ? selectedMonth : reqDate}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setFood(result.data.data);
                console.log(result.data.data);
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [selectedMonth, token]);

    const data = {
        labels: food?.map((food) => food?.food?.name),
        datasets: [
            {
                label: `Top Food sold in ${selectedMonth ? month[new Date(selectedMonth).getMonth()] : month[new Date(defaultValue).getMonth()]}`,
                backgroundColor: 'rgba(255, 192, 203, 0.2)', 
                borderColor: 'rgba(255, 192, 203, 1)', 
                pointBackgroundColor: 'rgba(255, 192, 203, 1)', 
                pointBorderColor: '#fff', 
                pointHoverBackgroundColor: '#fff', 
                pointHoverBorderColor: 'rgba(255, 192, 203, 1)', 
                data: food?.map((food) => food?.totalQuantitySold), 
            },
        ],
    };

    // Chart options
    const options = {
        scale: {
            ticks: { 
                beginAtZero: true,
                precision: 0, 
            },
        },
    };

    return (
        <div style={{ boxShadow: "rgba(0, 0, 0, 0.15) 1.4px 1.4px 2.2px" }} className='mt-5 pb-5 p-2'>
            <div className='d-flex'>
                <h4 className='fw-bold w-50' style={{ color: '#6c738f' }}>Most sold food in</h4>
                <input
                    onChange={(e) => {
                        const date = new Date(e.target.value);
                        const year = date.getFullYear();
                        const month = (date.getMonth() + 1).toString().padStart(2, '0');
                        const formattedDate = `${year}:${month}`;
                        setSelectedMonth(formattedDate); 
                    }}
                    defaultValue={defaultValue}
                    type="month"
                    className='form-control form-control-sm w-50'
                />

            </div>
            <div className='mt-3'>
                {isLoading ? (
                    <p className='text-center mt-5'>Loading...</p>
                ) : (
                    food.length > 0 ? 
                    <Radar data={data} options={options} /> : 
                    <h4 className='text-center mt-5 text-danger'>No Data</h4>
                )}
            </div>
        </div>
    );
};

export default RadarChart;

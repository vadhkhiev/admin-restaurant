import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { useSelector } from 'react-redux';

const LineChart = () => {
  const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/report/staff?month=2024:03`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStaffData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const generateRandomColor = () => {
    return `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.6)`;
  };
  
  
  const chartData = {
    labels: staffData.map(item => item.userEntity.name),
    datasets: [
      {
        label: 'Staff Income $',
        backgroundColor: staffData.map(() => generateRandomColor()), // Generate random color for each bar
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        data: staffData.map(item => item.totalPrice)
      }
    ]
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <div>
      <Bar
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default LineChart;

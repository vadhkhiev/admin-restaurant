import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';

const LineChart = () => {

  const [staffData, setStaffData] = useState([]);

  useEffect(() => {
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const fetchData = async () => {
      try {
        const response = await axios.get(`/report/staff?month=${year}:${month}`);
        setStaffData(response.data?.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const chartData = {
    labels: staffData.map((item) => item.cashier?.name),
    datasets: [
      {
        label: 'Top sellers this month',
        backgroundColor: '#fafafa',
        borderWidth: 1,
        borderRadius: 12, 
        data: staffData.map((item) => item?.totalPrice),
        barPercentage: 0.8, // Adjust the width of bars (default is 0.9)
        categoryPercentage: 0.6, // Adjust the spacing between bars (default is 0.8)
      },
    ],
  };
  

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value, index, values) {
            return '$' + value; // Prepend $ sign to y-axis ticks
          }
        }
      }
    }
  };

  return (
    <div className='custom-border rounded-3 p-3'>
      <h3 className='text-white'>Overview</h3>
      <Bar
        data={chartData}
        options={options}
      />
    </div>
  );
};

export default LineChart;

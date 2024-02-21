import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController, // Add DoughnutController
  ArcElement, // Add ArcElement
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  DoughnutController, // Register DoughnutController
  ArcElement // Register ArcElement
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Doughnut Chart',
    },
  },
  width: 400, 
  height: 400, 
};
const labels = ['Dataset 1', 'Dataset 2'];

const generateRandomData = () => Math.floor(Math.random() * 1000);

const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => generateRandomData()),
      backgroundColor: ['rgb(255, 99, 132)', 'rgb(53, 162, 235)'],
    },
  ],
};

export default function DoughnutChart() {
  return <Doughnut options={options} data={data} />;
}

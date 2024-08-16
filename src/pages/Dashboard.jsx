import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const [expenseResponse, categoryResponse] = await Promise.all([
          axios.get('https://msib-6-test-7uaujedvyq-et.a.run.app/api/expense', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('https://msib-6-test-7uaujedvyq-et.a.run.app/api/category', { headers: { Authorization: `Bearer ${token}` } })
        ]);
        
        setExpenses(expenseResponse.data.data);
        setCategories(categoryResponse.data.data);

        // Assume we fetch incomes similarly
        setIncomes(expenseResponse.data.data.map(exp => exp.amount));  // Placeholder
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };
    fetchData();
  }, []);

  // Prepare data for Bar Chart
  const barData = {
    labels: categories.map(cat => cat.name),
    datasets: [
      {
        label: 'Expenses',
        data: expenses.map(exp => exp.amount), // Use correct logic for mapping expenses to categories
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Incomes',
        data: incomes, // Use correct logic for mapping incomes to categories
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
    ],
  };

  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow p-6 bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Keuangan</h2>
          
          {/* Ringkasan Total */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Total Pengeluaran</h3>
              <p className="text-2xl">Rp {expenses.reduce((total, exp) => total + exp.amount, 0).toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Total Pemasukan</h3>
              <p className="text-2xl">Rp {incomes.reduce((total, inc) => total + inc, 0).toLocaleString()}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Saldo</h3>
              <p className="text-2xl">Rp {(incomes.reduce((total, inc) => total + inc, 0) - expenses.reduce((total, exp) => total + exp.amount, 0)).toLocaleString()}</p>
            </div>
          </div>

          {/* Grafik Bar */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <Bar data={barData} options={barOptions} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
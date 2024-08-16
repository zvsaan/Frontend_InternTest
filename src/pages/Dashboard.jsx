import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow p-6 bg-gray-100">
          <h2 className="text-xl font-semibold mb-4">Ringkasan Keuangan</h2>
          {/* Di sini akan ada komponen ringkasan nanti */}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
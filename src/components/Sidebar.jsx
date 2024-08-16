import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaWallet, FaList, FaTags } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="flex flex-col h-screen bg-blue-800 text-white w-64 py-8 px-6">
      <div className="text-center mb-10">
        <h2 className="text-2xl font-bold">Expense Tracker</h2>
      </div>
      <nav className="flex flex-col gap-6 flex-grow">
        <NavLink
          to="/dashboard"
          className="flex items-center gap-4 text-lg hover:bg-blue-700 p-3 rounded-lg transition-colors"
          activeClassName="bg-blue-700"
        >
          <FaHome /> Dashboard
        </NavLink>
        <NavLink
          to="/daftarpengeluaran"
          className="flex items-center gap-4 text-lg hover:bg-blue-700 p-3 rounded-lg transition-colors"
          activeClassName="bg-blue-700"
        >
          <FaList /> Daftar Pengeluaran
        </NavLink>
        <NavLink
          to="/dompet"
          className="flex items-center gap-4 text-lg hover:bg-blue-700 p-3 rounded-lg transition-colors"
          activeClassName="bg-blue-700"
        >
          <FaWallet /> Manajemen Dompet
        </NavLink>
        <NavLink
          to="/kategori"
          className="flex items-center gap-4 text-lg hover:bg-blue-700 p-3 rounded-lg transition-colors"
          activeClassName="bg-blue-700"
        >
          <FaTags /> Manajemen Kategori
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
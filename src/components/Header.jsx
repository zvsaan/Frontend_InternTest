import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Hapus autentikasi dari localStorage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('email');

    navigate('/login');
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="flex justify-between items-center bg-white shadow-md p-6 relative">
      <h1 className="text-2xl font-bold text-blue-800">Dashboard</h1>
      
      <div className="relative">
        {/* Foto Profil (Lingkaran) */}
        <button onClick={toggleDropdown} className="focus:outline-none">
          <img
            src="https://filestore.community.support.microsoft.com/api/images/0ce956b2-9787-4756-a580-299568810730?upload=true"
            alt="User"
            className="w-10 h-10 rounded-full object-cover border-2 border-gray-300"
          />
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10">
            <button
              onClick={() => navigate('/profile')}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
            >
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
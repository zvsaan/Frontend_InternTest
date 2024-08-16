import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const CategoryManagementPage = () => {
  const [categories, setCategories] = useState([]);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://msib-6-test-7uaujedvyq-et.a.run.app/api/category', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(response.data.data);
      } catch (error) {
        setNotification({ message: 'Gagal memuat data kategori', type: 'error' });
      }
    };
    fetchCategories();
  }, []);

  const filteredCategories = categories.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Daftar Kategori</h2>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <label className="mr-2">Tampilkan:</label>
          <select
            className="p-2 border rounded"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-6 py-4 border-b">Nama Kategori</th>
              <th className="px-6 py-4 border-b">Tipe</th>
            </tr>
          </thead>
          <tbody>
            {filteredCategories.map((category) => (
              <tr key={category.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b">{category.name}</td>
                <td className="px-6 py-4 border-b">{category.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span>
          Menampilkan {Math.min((currentPage - 1) * itemsPerPage + 1, categories.length)}-
          {Math.min(currentPage * itemsPerPage, categories.length)} dari {categories.length} kategori
        </span>
        <div className="flex items-center">
          <button
            className={`px-4 py-2 mr-2 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Sebelumnya
          </button>
          <button
            className={`px-4 py-2 ${currentPage * itemsPerPage >= categories.length ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage * itemsPerPage >= categories.length}
          >
            Berikutnya
          </button>
        </div>
      </div>

      {notification.message && (
        <div className={`fixed top-4 right-4 bg-${notification.type === 'success' ? 'green' : 'red'}-500 text-white p-4 rounded-lg shadow-lg`}>
          <p>{notification.message}</p>
          <button onClick={() => setNotification({ message: '', type: '' })} className="absolute top-2 right-2 text-white">✕</button>
        </div>
      )}
    </Layout>
  );
};

export default CategoryManagementPage;
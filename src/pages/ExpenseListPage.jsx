import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const ExpenseListPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [wallets, setWallets] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [notification, setNotification] = useState({ message: '', type: '' });
  const [newExpense, setNewExpense] = useState({ name: '', category_id: '', amount: '', wallet_id: '', time: '' });
  
  // Pagination and Filters
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const [expensesResponse, categoriesResponse, walletsResponse] = await Promise.all([
          axios.get('https://msib-6-test-7uaujedvyq-et.a.run.app/api/expense', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('https://msib-6-test-7uaujedvyq-et.a.run.app/api/category', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('https://msib-6-test-7uaujedvyq-et.a.run.app/api/wallet', { headers: { Authorization: `Bearer ${token}` } })
        ]);

        setExpenses(expensesResponse.data.data);
        setCategories(categoriesResponse.data.data);
        setWallets(walletsResponse.data.data);
      } catch (error) {
        setNotification({ message: 'Gagal memuat data', type: 'error' });
      }
    };
    fetchData();
  }, []);

  // Fungsi untuk menambah expense (POST)
  const handleAddExpense = async () => {
    const token = localStorage.getItem('token');
    try {
      const formattedAmount = parseFloat(newExpense.amount).toFixed(2);
      const response = await axios.post(`https://msib-6-test-7uaujedvyq-et.a.run.app/api/wallet/${newExpense.wallet_id}/expense`, {
        ...newExpense,
        amount: formattedAmount, // Format amount dengan 2 desimal
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses([...expenses, response.data.expense]);
      setNotification({ message: 'Catatan berhasil ditambahkan', type: 'success' });
      setIsPopupOpen(false);
      setNewExpense({ name: '', category_id: '', amount: '', wallet_id: '', time: '' });
    } catch (error) {
      console.error('Error adding expense:', error.response?.data || error.message);
      setNotification({ message: 'Gagal menambah catatan', type: 'error' });
    }
  };

  const handleEditExpense = async () => {
    const token = localStorage.getItem('token');
    try {
      const formattedAmount = parseFloat(selectedExpense.amount).toFixed(2);
      await axios.put(`https://msib-6-test-7uaujedvyq-et.a.run.app/api/expense/${selectedExpense.id}`, {
        ...selectedExpense,
        amount: formattedAmount, // Format amount dengan 2 desimal
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.map((exp) => (exp.id === selectedExpense.id ? { ...exp, ...selectedExpense } : exp)));
      setNotification({ message: 'Catatan berhasil diperbarui', type: 'success' });
      setIsPopupOpen(false);
      setSelectedExpense(null);
    } catch (error) {
      console.error('Error editing expense:', error.response?.data || error.message);
      setNotification({ message: 'Gagal menyimpan catatan', type: 'error' });
    }
  };

  const handleDeleteExpense = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://msib-6-test-7uaujedvyq-et.a.run.app/api/expense/${selectedExpense.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses(expenses.filter((exp) => exp.id !== selectedExpense.id));
      setNotification({ message: 'Catatan berhasil dihapus', type: 'success' });
      setIsDeletePopupOpen(false);
    } catch (error) {
      console.error('Error deleting expense:', error.response?.data || error.message);
      setNotification({ message: 'Gagal menghapus catatan', type: 'error' });
    }
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  const getWalletName = (walletId) => {
    const wallet = wallets.find(wal => wal.id === walletId);
    return wallet ? wallet.name : 'Unknown';
  };

  const filteredExpenses = expenses.filter(expense => {
    return selectedCategoryFilter ? expense.category_id === parseInt(selectedCategoryFilter) : true;
  });

  const paginatedExpenses = filteredExpenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(filteredExpenses.length / itemsPerPage);

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Daftar Pengeluaran</h2>
        <button onClick={() => setIsPopupOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
          Tambah Catatan
        </button>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div>
          <label className="mr-2">Filter Kategori:</label>
          <select
            className="p-2 border rounded"
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
          >
            <option value="">Semua Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
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
              <th className="px-6 py-4 border-b">Nama</th>
              <th className="px-6 py-4 border-b">Jumlah</th>
              <th className="px-6 py-4 border-b">Kategori</th>
              <th className="px-6 py-4 border-b">Dompet</th>
              <th className="px-6 py-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedExpenses.map((expense) => (
              <tr key={expense.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b">{expense.name}</td>
                <td className="px-6 py-4 border-b">Rp {expense.amount.toLocaleString()}</td>
                <td className="px-6 py-4 border-b">{getCategoryName(expense.category_id)}</td>
                <td className="px-6 py-4 border-b">{getWalletName(expense.wallet_id)}</td>
                <td className="px-6 py-4 border-b">
                  <button
                    onClick={() => { setSelectedExpense(expense); setIsPopupOpen(true); }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setSelectedExpense(expense); setIsDeletePopupOpen(true); }}
                    className="bg-red-500 text-white px-4 py-2 rounded"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <span>
          Menampilkan {Math.min((currentPage - 1) * itemsPerPage + 1, filteredExpenses.length)}-
          {Math.min(currentPage * itemsPerPage, filteredExpenses.length)} dari {filteredExpenses.length} catatan
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
            className={`px-4 py-2 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Berikutnya
          </button>
        </div>
      </div>

      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{selectedExpense ? 'Edit' : 'Tambah'} Catatan</h2>
            <input
              className="w-full p-2 mb-4 border rounded"
              placeholder="Nama Transaksi"
              value={selectedExpense ? selectedExpense.name : newExpense.name}
              onChange={(e) => selectedExpense ? setSelectedExpense({ ...selectedExpense, name: e.target.value }) : setNewExpense({ ...newExpense, name: e.target.value })}
            />
            <input
              className="w-full p-2 mb-4 border rounded"
              type="number"
              placeholder="Jumlah"
              value={selectedExpense ? selectedExpense.amount : newExpense.amount}
              onChange={(e) => selectedExpense ? setSelectedExpense({ ...selectedExpense, amount: e.target.value }) : setNewExpense({ ...newExpense, amount: e.target.value })}
            />
            <select
              className="w-full p-2 mb-4 border rounded"
              value={selectedExpense ? selectedExpense.category_id : newExpense.category_id}
              onChange={(e) => selectedExpense ? setSelectedExpense({ ...selectedExpense, category_id: e.target.value }) : setNewExpense({ ...newExpense, category_id: e.target.value })}
            >
              <option value="">Pilih Kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>{category.name}</option>
              ))}
            </select>
            <select
              className="w-full p-2 mb-4 border rounded"
              value={selectedExpense ? selectedExpense.wallet_id : newExpense.wallet_id}
              onChange={(e) => selectedExpense ? setSelectedExpense({ ...selectedExpense, wallet_id: e.target.value }) : setNewExpense({ ...newExpense, wallet_id: e.target.value })}
            >
              <option value="">Pilih Dompet</option>
              {wallets.map((wallet) => (
                <option key={wallet.id} value={wallet.id}>{wallet.name}</option>
              ))}
            </select>
            <input
              className="w-full p-2 mb-4 border rounded"
              type="datetime-local"
              value={selectedExpense ? selectedExpense.time : newExpense.time}
              onChange={(e) => selectedExpense ? setSelectedExpense({ ...selectedExpense, time: e.target.value }) : setNewExpense({ ...newExpense, time: e.target.value })}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => { setIsPopupOpen(false); setSelectedExpense(null); }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button onClick={selectedExpense ? handleEditExpense : handleAddExpense} className="bg-blue-500 text-white px-4 py-2 rounded">
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Popup for delete confirmation */}
      {isDeletePopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Konfirmasi Penghapusan</h2>
            <p>Apakah Anda yakin ingin menghapus catatan ini?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsDeletePopupOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteExpense}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {notification.message && (
        <div className={`fixed top-4 right-4 bg-${notification.type === 'success' ? 'green' : 'red'}-500 text-white p-4 rounded-lg shadow-lg`}>
          <p>{notification.message}</p>
          <button onClick={() => setNotification({ message: '', type: '' })} className="absolute top-2 right-2 text-white">✕</button>
        </div>
      )}
    </Layout>
  );
};

export default ExpenseListPage;
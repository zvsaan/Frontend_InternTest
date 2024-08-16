import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';

const WalletManagementPage = () => {
  const [wallets, setWallets] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsDeletePopupOpen] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [newWalletName, setNewWalletName] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://msib-6-test-7uaujedvyq-et.a.run.app/api/wallet', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWallets(response.data.data);
      } catch (error) {
        setNotification({ message: 'Gagal memuat data dompet', type: 'error' });
      }
    };
    fetchWallets();
  }, []);

  const handleAddWallet = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('https://msib-6-test-7uaujedvyq-et.a.run.app/api/wallet', {
        name: newWalletName,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallets([...wallets, response.data.wallet]);
      setNotification({ message: 'Dompet berhasil ditambahkan', type: 'success' });
      setIsPopupOpen(false);
      setNewWalletName('');
    } catch (error) {
      console.error('Error adding wallet:', error.response?.data || error.message);
      setNotification({ message: 'Gagal menambah dompet', type: 'error' });
    }
  };

  const handleEditWallet = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`https://msib-6-test-7uaujedvyq-et.a.run.app/api/wallet/${selectedWallet.id}`, {
        name: newWalletName,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallets(wallets.map((wal) => (wal.id === selectedWallet.id ? { ...wal, name: newWalletName } : wal)));
      setNotification({ message: 'Dompet berhasil diperbarui', type: 'success' });
      setIsPopupOpen(false);
      setSelectedWallet(null);
      setNewWalletName('');
    } catch (error) {
      console.error('Error editing wallet:', error.response?.data || error.message);
      setNotification({ message: 'Gagal mengedit dompet', type: 'error' });
    }
  };

  const handleDeleteWallet = async () => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`https://msib-6-test-7uaujedvyq-et.a.run.app/api/wallet/${selectedWallet.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWallets(wallets.filter((wal) => wal.id !== selectedWallet.id));
      setNotification({ message: 'Dompet berhasil dihapus', type: 'success' });
      setIsDeletePopupOpen(false);
      setSelectedWallet(null);
    } catch (error) {
      console.error('Error deleting wallet:', error.response?.data || error.message);
      setNotification({ message: 'Gagal menghapus dompet', type: 'error' });
    }
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Manajemen Dompet</h2>
        <button onClick={() => { setIsPopupOpen(true); setSelectedWallet(null); setNewWalletName(''); }} className="bg-blue-500 text-white px-4 py-2 rounded">
          Tambah Dompet
        </button>
      </div>

      {/* Tabel Dompet */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg shadow-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="px-6 py-4 border-b">Nama Dompet</th>
              <th className="px-6 py-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {wallets.map((wallet) => (
              <tr key={wallet.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 border-b">{wallet.name}</td>
                <td className="px-6 py-4 border-b">
                  <button
                    onClick={() => { setSelectedWallet(wallet); setNewWalletName(wallet.name); setIsPopupOpen(true); }}
                    className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => { setSelectedWallet(wallet); setIsDeletePopupOpen(true); }}
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

      {/* Popup for adding/editing wallet */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">{selectedWallet ? 'Edit' : 'Tambah'} Dompet</h2>
            <input
              className="w-full p-2 mb-4 border rounded"
              placeholder="Nama Dompet"
              value={newWalletName}
              onChange={(e) => setNewWalletName(e.target.value)}
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => { setIsPopupOpen(false); setSelectedWallet(null); setNewWalletName(''); }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button onClick={selectedWallet ? handleEditWallet : handleAddWallet} className="bg-blue-500 text-white px-4 py-2 rounded">
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
            <p>Apakah Anda yakin ingin menghapus dompet ini?</p>
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setIsDeletePopupOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleDeleteWallet}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.message && (
        <div className={`fixed top-4 right-4 bg-${notification.type === 'success' ? 'green' : 'red'}-500 text-white p-4 rounded-lg shadow-lg`}>
          <p>{notification.message}</p>
          <button onClick={() => setNotification({ message: '', type: '' })} className="absolute top-2 right-2 text-white">✕</button>
        </div>
      )}
    </Layout>
  );
};

export default WalletManagementPage;
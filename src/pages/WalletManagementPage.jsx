import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
// import WalletManagement from '../components/WalletManagement';
import axios from 'axios';

const WalletManagementPage = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://msib-6-test-7uaujedvyq-et.a.run.app/api/wallet', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setWallets(response.data.data);
      } catch (error) {
        console.error('Error fetching wallets:', error);
      }
    };

    fetchWallets();
  }, []);

  const addWallet = async (name) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'https://msib-6-test-7uaujedvyq-et.a.run.app/api/wallet',
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setWallets([...wallets, response.data.wallet]);
    } catch (error) {
      console.error('Error adding wallet:', error);
    }
  };

  const deleteWallet = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://msib-6-test-7uaujedvyq-et.a.run.app/api/wallet/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setWallets(wallets.filter((wallet) => wallet.id !== id));
    } catch (error) {
      console.error('Error deleting wallet:', error);
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <Header />
        <main className="flex-grow p-6 bg-gray-100">
          {/* <WalletManagement wallets={wallets} onAddWallet={addWallet} onDeleteWallet={deleteWallet} /> */}
        </main>
      </div>
    </div>
  );
};

export default WalletManagementPage;
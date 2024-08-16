import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import img from "../assets/auth.jpg";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password dan konfirmasi password tidak cocok.');
      return;
    }

    try {
      const response = await axios.post('https://msib-6-test-7uaujedvyq-et.a.run.app/api/register', {
        name,
        email,
        password,
        password_confirmation: confirmPassword
      });

      toast.success('Registrasi berhasil! Silakan login.');
      navigate('/login');
    } catch (error) {
      toast.error('Terjadi kesalahan saat registrasi.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl">Register</h2>
          <p className="text-xs mt-4">Daftarkan akun Anda</p>
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <input
              className="p-3 mt-8 rounded-3xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              type="text"
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              className="p-3 rounded-3xl border shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="p-3 rounded-3xl border shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input
              className="p-3 rounded-3xl border shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="p-3 bg-gradient-to-r from-blue-500 ring-indigo-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            >
              Register
            </button>
          </form>
          <p className="text-sm mt-4">
            Sudah punya akun?{' '}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login di sini
            </Link>
          </p>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={img} alt="Register" />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Register
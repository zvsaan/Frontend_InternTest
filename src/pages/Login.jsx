import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import img from "../assets/auth.jpg";

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://msib-6-test-7uaujedvyq-et.a.run.app/api/login', {
        email,
        password
      });

      const { token } = response.data;

      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('email', email);
      localStorage.setItem('token', token);

      setIsAuthenticated(true);
      toast.success('Login berhasil!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Email atau password salah.');
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl">Login</h2>
          <p className="text-xs mt-4">Masukkan akun Anda untuk login</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <input
              className="p-3 mt-8 rounded-3xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
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
            <button
              type="submit"
              className="p-3 bg-gradient-to-r from-blue-500 ring-indigo-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            >
              Login
            </button>
          </form>
          <p className="text-sm mt-4">
            Belum punya akun?{' '}
            <Link to="/register" className="text-blue-500 hover:underline">
              Daftar di sini
            </Link>
          </p>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src={img} alt="Login" />
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
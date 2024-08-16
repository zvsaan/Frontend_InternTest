import React, { useState } from 'react';
import FormInput from '../components/FormInput';
// import img from "../assets/login2.jpg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Tambahkan logika untuk handle login API di sini
    console.log('Login clicked', { email, password });
  };

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="flex rounded-2xl shadow-2xl max-w-3xl p-5 items-center">
        <div className="md:w-1/2 px-8 md:px-16">
          <h2 className="font-bold text-2xl">Login</h2>
          <p className="text-xs mt-4">Masukkan akun Anda untuk login</p>
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <FormInput
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <FormInput
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              type="submit"
              className="p-3 bg-gradient-to-r from-blue-500 ring-indigo-500 text-white font-bold rounded-full transition-transform transform-gpu hover:-translate-y-1 hover:shadow-lg"
            >
              Login
            </button>
          </form>
        </div>
        <div className="md:block hidden w-1/2">
          <img className="rounded-2xl" src="https://id.pinterest.com/pin/703756186861225/" alt="Login" />
        </div>
      </div>
    </section>
  );
};

export default Login;
import React from 'react';

const FormInput = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className="p-3 rounded-3xl border shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-300"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default FormInput;

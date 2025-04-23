import React from 'react';

const Button = ({ label, isActive, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer hover:bg-gray-200 px-4 py-2 rounded-xl whitespace-nowrap font-medium 
        ${isActive ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}
    >
      {label}
    </button>
  );
};

export default Button;
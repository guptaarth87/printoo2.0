// Loader.jsx
import React from 'react';
import './Loader.css'; // You can style this according to your preference

const Loader = () => {
  return (
    <div className="loader">
      {/* Spinner can be created with CSS or you can use a library for spinner */}
      <div className="spinner"></div>
    </div>
  );
};

export default Loader;

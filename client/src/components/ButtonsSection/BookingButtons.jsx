import React from 'react';
import { useNavigate } from 'react-router-dom';

const BookingButtons = () => {
  const navigate = useNavigate();

  const handlePreBook = () => {
    navigate('/bookorder?type=prebook');
  };

  const handleExpressBook = () => {
    navigate('/bookorder?type=express');
  };

  return (
    <div className="container d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mt-4">
      <button
        className="btn background-clr white"
        style={{ minWidth: '200px' }}
        onClick={handlePreBook}
      >
        Pre Book
      </button>
      <button
        className="btn background-clr white"
        style={{ minWidth: '200px' }}
        onClick={handleExpressBook}
      >
        Express Booking
      </button>
    </div>
  );
};

export default BookingButtons;

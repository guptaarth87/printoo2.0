import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './Navbar.css'
const Navbar = () => {
  const navigate = useNavigate();
  
  // Check if the user is logged in by checking the cookie
  const userEmail = Cookies.get('printouseremail');

  // Function to handle logout
  const handleLogout = () => {
    Cookies.remove('printouseremail');
    navigate('/login'); // Redirect to login after logout
  };

  // Function to get the front part of the email before '@'
  const displayEmail = userEmail ? userEmail.split('@')[0] : null;

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Printoo</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/bookorder">Book Order</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/feedback">Contact us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/previosorders">Previous Orders</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about-us">About us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/terms-and-conditions">Terms & Conditions</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cancellation-and-shipping">Cancellation and shipping</Link>
            </li>
            {!userEmail ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/signup">Signup</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <span className="nav-link">Welcome, {displayEmail}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-outline-danger nav-link" onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

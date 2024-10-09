import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import OrderCard from './OrderCard'; // Reusable component for individual orders
import Pagination from './Pagination'; // Custom pagination component
import Loader from '../Loader/Loader'; // Loader component for showing spinner
import API_URL from '../../_helpers';

const PreviousOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const ordersPerPage = 10; // Pagination: 10 orders per page

  // Check if user is logged in and get the email from cookies
  useEffect(() => {
    const userEmail = Cookies.get('printouseremail');
    if (!userEmail) {
      navigate('/signin'); // Redirect to signin if email not found
    }
    setEmail(userEmail);
  }, [navigate]);

  // Fetch orders based on user email
  useEffect(() => {
    const fetchOrders = async () => {
        setLoading(true);
        try {
         
          const response = await axios.get(`${API_URL}/orders/getordersbyemail/${email}`);
          console.log("process")
          setOrders(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching orders:', error);
          setLoading(false);
        }
      };
    
    if (email) {
      console.log(email);
      fetchOrders();
    }
  }, [email]);

  // Get current orders based on pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Your Previous Orders</h2>
      {loading ? (
        <Loader /> // Show spinner while loading
      ) : (
        <>
          <div className="row">
            {currentOrders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
          <Pagination
            ordersPerPage={ordersPerPage}
            totalOrders={orders.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </div>
  );
};

export default PreviousOrders;

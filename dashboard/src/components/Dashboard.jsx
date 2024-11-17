import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../_helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Users from './Users';
import Feedback from './Feedback';
import OrderFilters from './OrderFilters';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showOrderDetails, setShowOrderDetails] = useState(null); // State for showing order preview
  const itemsPerPage = 10;

  useEffect(() => {
    fetchOrders();
    fetchFeedback();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/getorders`);
      setOrders(response.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    }
  };

  const fetchFeedback = async () => {
    try {
      const response = await axios.get(`${API_URL}/feedback`);
      setFeedback(response.data);
    } catch (error) {
      toast.error('Failed to fetch feedback');
    }
  };

  const handleDeleteOrder = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this order?');
    if (!confirmed) return;

    try {
      await axios.delete(`${API_URL}/orders/deleteorder/${id}`);
      toast.success('Order deleted successfully');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to delete order');
    }
  };

  const handleToggleDelivered = async (id, currentStatus) => {
    const confirmed = window.confirm('Do you want to mark this order as delivered?');
    if (!confirmed) return;

    try {
      await axios.patch(`${API_URL}/orders/toggledelivered/${id}`, { delivered: !currentStatus });
      toast.success('Order status updated');
      fetchOrders();
    } catch (error) {
      toast.error('Failed to update order status');
    }
  };

  const handlePreviewOrderDetails = (order) => {
    setShowOrderDetails(order); // Set the selected order for preview
  };

  const handleClosePreview = () => {
    setShowOrderDetails(null); // Close the preview
  };

  const indexOfLastOrder = currentPage * itemsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Dashboard</h1>
      <div className="text-center mb-4">
        <button onClick={() => setActiveTab('orders')} className={`btn ${activeTab === 'orders' ? 'btn-primary' : 'btn-outline-primary'}`}>
          Orders
        </button>
        <button onClick={() => setActiveTab('users')} className={`btn ${activeTab === 'users' ? 'btn-primary' : 'btn-outline-primary'}`}>
          Users
        </button>
        <button onClick={() => setActiveTab('feedback')} className={`btn ${activeTab === 'feedback' ? 'btn-primary' : 'btn-outline-primary'}`}>
          View Feedback
        </button>
        <button onClick={() => setActiveTab('orderFilters')} className={`btn ${activeTab === 'orderFilters' ? 'btn-primary' : 'btn-outline-primary'}`}>
          Order Filters
        </button>
      </div>

      {activeTab === 'orders' && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Email</th>
                <th>Phone No</th>
                <th>Delivery Slot</th>
                <th>Type of Order</th>
                <th>Address</th>
                <th>Price</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id}>
                  <td>{order.email}</td>
                  <td>{order.phoneno}</td>
                  <td>{order.deliveryslot}</td>
                  <td>{order.typeOfOrder}</td>
                  <td>{order.address}</td>
                  <td>{order.price}</td>
                  <td>{new Date(order.createdAt).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm mr-2"
                      onClick={() => handleToggleDelivered(order._id, order.delivered)}
                    >
                      {order.delivered ? 'Mark as Undelivered' : 'Mark as Delivered'}
                    </button><br />
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeleteOrder(order._id)}
                    >
                      Delete
                    </button><br />
                    {order.color_fileurl && (
                      <button className="btn btn-success btn-sm ms-2" onClick={() => handlePreviewOrderDetails(order)}>Preview Color</button>
                    )}
                    <br />
                    {order.black_and_white_fileurl && (
                      <button className="btn btn-secondary btn-sm ms-2" onClick={() => handlePreviewOrderDetails(order)}>Preview B/W</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({ length: totalPages }, (_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}

      {activeTab === 'users' && <Users />}
      {activeTab === 'feedback' && <Feedback feedback={feedback} />}
      {activeTab === 'orderFilters' && <OrderFilters />}

      {/* Order Preview Modal */}
      {showOrderDetails && (
        <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Order Preview</h5>
                <button className="close" onClick={handleClosePreview}>&times;</button>
              </div>
              <div className="modal-body">
                <p><strong>Order Name:</strong> {showOrderDetails.name}</p>
                <p><strong>Email:</strong> {showOrderDetails.email}</p>
                <p><strong>Phone No:</strong> {showOrderDetails.phoneno}</p>
                <p><strong>Address:</strong> {showOrderDetails.address}</p>
                <p><strong>Type of Order:</strong> {showOrderDetails.typeOfOrder}</p>
                <p><strong>Price:</strong> {showOrderDetails.price}</p>
                <p><strong>Delivery Slot:</strong> {showOrderDetails.deliveryslot}</p>
                <p><strong>Created At:</strong> {new Date(showOrderDetails.createdAt).toLocaleString()}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClosePreview}>Close</button>
                {showOrderDetails.color_fileurl && (
                  <a href={showOrderDetails.color_fileurl} target="_blank" className="btn btn-success" download>Download Color</a>
                )}
                {showOrderDetails.black_and_white_fileurl && (
                  <a href={showOrderDetails.black_and_white_fileurl} target="_blank" className="btn btn-secondary" download>Download B/W</a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Dashboard;

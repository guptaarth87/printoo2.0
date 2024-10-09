import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import API_URL from '../_helpers';

const OrderFilters = () => {
  const [startdate, setStartDate] = useState('');
  const [enddate, setEndDate] = useState('');
  const [starttime, setStartTime] = useState('');
  const [endtime, setEndTime] = useState('');
  const [deliveryslot, setDeliverySlot] = useState('');
  const [minprice, setMinPrice] = useState('');
  const [maxprice, setMaxPrice] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  const handleFilter = async () => {
    try {
      const response = await axios.post(`${API_URL}/orders/getfilteredorder`, {
        startdate,
        enddate,
        starttime,
        endtime,
        deliveryslot,
        minprice,
        maxprice,
      });
      setFilteredOrders(response.data);
    } catch (error) {
      console.error('Error fetching filtered orders', error);
    }
  };

  const exportToExcel = () => {
    const excelData = filteredOrders.map(order => ({
      'Created At': new Date(order.createdAt).toLocaleString(),
      'User Name': order.uname,
      Email: order.email,
      'Phone No': order.phoneno,
      'Delivery Slot': order.deliveryslot,
      'Type of Order': order.typeOfOrder,
      Address: order.address,
      Price: order.price,
      'Payment Data': JSON.stringify(order.paymentdata.amount),  // Converting object to string for Excel
      Delivered: order.delivered ? 'Yes' : 'No',
    }));

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Create a new workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Filtered Orders');

    // Write the workbook and trigger a download
    XLSX.writeFile(wb, 'FilteredOrders.xlsx');
  };

  return (
    <div className="container">
      <h3 className="text-center">Order Filters</h3>
      <form className="mb-4">
        <div className="form-group">
          <label>Start Date</label>
          <input type="date" className="form-control" value={startdate} onChange={(e) => setStartDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>End Date</label>
          <input type="date" className="form-control" value={enddate} onChange={(e) => setEndDate(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Start Time (1-24, where 24 means midnight and 12 is noon)</label>
          <input type="number" min="1" max="24" className="form-control" value={starttime} onChange={(e) => setStartTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label>End Time (1-24, where 24 means midnight and 12 is noon)</label>
          <input type="number" min="1" max="24" className="form-control" value={endtime} onChange={(e) => setEndTime(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Delivery Slot</label>
          <input type="text" className="form-control" value={deliveryslot} onChange={(e) => setDeliverySlot(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Min Price</label>
          <input type="number" className="form-control" value={minprice} onChange={(e) => setMinPrice(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Max Price</label>
          <input type="number" className="form-control" value={maxprice} onChange={(e) => setMaxPrice(e.target.value)} />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleFilter}>
          Filter Orders
        </button>
      </form>

      <h4>Filtered Orders</h4>
      {filteredOrders.length > 0 ? (
        <div>
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
                  <th>Delivered</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order._id}>
                    <td>{order.email}</td>
                    <td>{order.phoneno}</td>
                    <td>{order.deliveryslot}</td>
                    <td>{order.typeOfOrder}</td>
                    <td>{order.address}</td>
                    <td>{order.price}</td>
                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                    <td>{order.delivered ? 'Yes' : 'No'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button className="btn btn-success" onClick={exportToExcel}>
            Download Excel File
          </button>
        </div>
      ) : (
        <p>No filtered orders to display.</p>
      )}
    </div>
  );
};

export default OrderFilters;

import React from 'react';

const OrderCard = ({ order }) => {
  return (
    <div className="col-md-6 mb-4">
      <div className="card border-primary shadow-sm">
        <div className="card-body">
          {/* Order ID and Date/Time */}
          <h5 className="card-title">
            <strong>Order ID:</strong> {order._id}
          </h5>
          <p className="card-text text-muted">
            <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString()}
          </p>

          {/* Order Details */}
          <p className="card-text">
            <strong>Name:</strong> {order.uname}
          </p>
          <p className="card-text">
            <strong>Delivery Slot:</strong> {order.deliveryslot}
          </p>
          <p className="card-text">
            <strong>Order Type:</strong> {order.typeOfOrder}
          </p>
          <p className="card-text">
            <strong>Price:</strong> ₹{order.price}
          </p>
          <p className="card-text">
            <strong>Status:</strong> {order.delivered ? 'Delivered' : 'Not Delivered'}
          </p>

          {/* File Preview Buttons */}
          <div className="mt-3">
            {order.black_and_white_fileurl && (
              <button
                className="btn btn-outline-dark me-2"
                onClick={() => window.open(order.black_and_white_fileurl, '_blank')}
              >
                Preview B/W File
              </button>
            )}
            {order.color_fileurl && (
              <button
                className="btn btn-outline-dark"
                onClick={() => window.open(order.color_fileurl, '_blank')}
              >
                Preview Color File
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;

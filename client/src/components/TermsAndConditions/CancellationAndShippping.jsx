import React from "react";

const CancellationAndShipping = () => {
  return (
    <div className="container my-5">
      <h1>Cancellation and Shipping Policy</h1>

      <h2>Cancellation Policy</h2>
      <p>
        You can cancel your order up to 6 hours before the selected delivery slot. Cancellations after this period will not be accepted, and refunds will not be issued. 
      </p>
      <p>
        To cancel your order, navigate to the "My Orders" section in the app and select "Cancel Order" for the respective booking.
      </p>

      <h2>Shipping Policy</h2>
      <p>
        Orders are delivered only to the university campus selected at the time of booking. Ensure accurate details for delivery to avoid delays.
      </p>
      <p>
        Printoo is committed to delivering your order within the chosen delivery slot. However, delays may occur due to unforeseen circumstances, and we will notify you promptly in such cases.
      </p>
    </div>
  );
};

export default CancellationAndShipping;

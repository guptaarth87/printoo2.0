import React from 'react';
import SlotChart from './SlotChart';

const AvailableSlots = () => {
  const availableslots = [
    { time_slot: '8:20', pre_order_remaining: 15, express_order_remaining: 0 },
    { time_slot: '10:20', pre_order_remaining: 10, express_order_remaining: 17 },
    { time_slot: '12:20', pre_order_remaining: 0, express_order_remaining: 10 },
    { time_slot: '3:00', pre_order_remaining: 0, express_order_remaining: 0 },
  ];

  // Function to return appropriate message based on the number of remaining slots
 
  return (
    <div>
    <SlotChart slots={availableslots} />
  </div>
  );
};

export default AvailableSlots;

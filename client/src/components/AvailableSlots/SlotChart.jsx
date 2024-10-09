import React from 'react';
import './SlotChart.css';


const SlotChart = ({ slots }) => {
  const getSlotMessage = (remaining) => {
    return remaining === 0 ? 'Slot Full!' : `${remaining} slots available`;
  };

  return (
    <div className="slot-chart-container">
      <div className="slot-table background-clr ">
        <div className="slot-header d-flex">
          <div className="slot-header-item flex-fill">Time Slot</div>
          <div className="slot-header-item flex-fill">Pre Order</div>
          <div className="slot-header-item flex-fill">Express Order</div>
        </div>

        {slots.map((slot, index) => (
          <div key={index} className="slot-row d-flex">
            <div className="slot-cell flex-fill">{slot.time_slot}</div>
            <div className="slot-cell flex-fill">
              {getSlotMessage(slot.pre_order_remaining)}
            </div>
            <div className="slot-cell flex-fill">
              {getSlotMessage(slot.express_order_remaining)}
            </div>
          </div>
        ))}
        {/* Notes Section */}
      <div className="mt-4 white">
        <p className=" note-text white">
          <strong>Note:</strong> You can place your Express-Order up to 1 hour before your preferred delivery time slot.
        </p>
        <p className=" note-text white">
          For Pre-order, please place your order by 8:00 PM the day before.
        </p>
      </div>
      </div>

      
    </div>
  );
};

export default SlotChart;

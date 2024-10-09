import React from 'react';
import './PriceChart.css'; // Import the CSS file

const PriceChart = () => {
  // Array of items with their names and prices
  const items = [
    { name: 'B/W Print Pre-Order', price: '2 per Page' },
    { name: 'B/W Print Express-Order', price: '4 per Page' },
    { name: 'Color Print Pre-Order', price: '4 per Page' },
    { name: 'Color Print Express-Order', price: '6 per Page' },
    
  ];

  return (
    <div className="container mt-5">
      <div className="price-chart background-clr">
        <h3 className="text-center mb-4">Price Chart</h3>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <div className="price-chart-item">
              <span>{item.name}</span>
              <span>{item.price}</span>
            </div>
            {/* Add a separator between items except for the last item */}
            {index < items.length - 1 && <div className="separator"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default PriceChart;

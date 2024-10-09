import React from 'react';

const Feedback = ({ feedback }) => {
  return (
    <div className="container">
      <h3 className="text-center">Feedback</h3>
      <div className="row">
        {feedback.map((item) => (
          <div className="col-md-4 mb-4" key={item._id}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{item.subject}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.email}</h6>
                <p className="card-text">{item.description}</p>
                <div>
                  {Array(item.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="text-warning">★</span>
                    ))}
                  {Array(5 - item.rating)
                    .fill()
                    .map((_, i) => (
                      <span key={i} className="text-secondary">★</span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;

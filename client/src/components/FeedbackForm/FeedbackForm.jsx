import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader'; // A component that handles the loading state
import './feedbackform.css'; // Custom styles for the feedback form
import API_URL from '../../_helpers';
import { useNavigate } from 'react-router-dom';

const FeedbackForm = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false);
  const [rating, setRating] = useState(0); // State to manage star rating
  const [email, setEmail] = useState('');
 
  const navigate = useNavigate();
  useEffect(() => {
    const userEmail = Cookies.get('printouseremail');
    if (!userEmail) {
       
       navigate('/signin');
    }
    setEmail(userEmail);
  }, [navigate]);

 

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const feedbackData = {
        ...data,
        rating,
        email,
      };
      const response = await axios.post(`${API_URL}/feedback`, feedbackData);
      console.log(feedbackData);
      toast.success('Feedback submitted successfully');
    } catch (error) {
      toast.error('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="text-center mb-4" style={{ color: '#5A7D9F' }}>Feedback Form / Report Issue</h3>
      <form onSubmit={handleSubmit(onSubmit)}>

        <div className="mb-3">
          <label className='inputlabeltext'>Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            readOnly // Read-only as it's auto-filled from cookies
          />
        </div>

        <div className="mb-3">
          <label className='inputlabeltext'>*Subject</label>
          <input
            type="text"
            className="form-control"
            {...register('subject', { required: true })}
          />
          {errors.subject && <span className="text-danger">Subject is required</span>}
        </div>

        <div className="mb-3">
          <label className='inputlabeltext'>*Description</label>
          <textarea
            className="form-control"
            rows="4"
            {...register('description', { required: true })}
          ></textarea>
          {errors.description && <span className="text-danger">Description is required</span>}
        </div>

        <div className="mb-3">
          <label className='inputlabeltext'>Rate your experience (out of 5)</label>
          <div className="rating-container">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`star ${rating >= star ? 'filled' : ''}`}
                onClick={() => setRating(star)} // Update rating on click
              >
                ★
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>

      <ToastContainer />
      {loading && <Loader />} {/* Show loader during submission */}
    </div>
  );
};

export default FeedbackForm;

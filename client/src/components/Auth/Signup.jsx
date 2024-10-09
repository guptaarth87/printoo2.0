import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from '../Loader/Loader';
import API_URL from '../../_helpers';

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  useEffect(() => {
    const email = Cookies.get('printouseremail');
    if (email) {
      navigate('/'); // Redirect to home if email is found in cookies
    }
  }, [navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/users/signup`, data);
      toast.success(response.data.message);
      Cookies.set('printouseremail', data.email);
      navigate('/'); // Redirect after successful signup
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container containerx mt-5" style={{ maxWidth: '600px' }}>
      <h3 className="text-center mb-4" style={{ color: '#5A7D9F' }}>Signup</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className='inputlabeltext'>*Name</label>
          <input
            type="text"
            className="form-control"
            {...register('name', { required: true })}
          />
          {errors.name && <span className="text-danger">Name is required</span>}
        </div>

        <div className="mb-3">
          <label className='inputlabeltext'>*Email</label>
          <input
            type="email"
            className="form-control"
            {...register('email', { required: true })}
          />
          {errors.email && <span className="text-danger">Email is required</span>}
        </div>

        <div className="mb-3">
          <label className='inputlabeltext'>*Phone No</label>
          <input
            type="text"
            className="form-control"
            {...register('phoneno', { required: true })}
          />
          {errors.phoneno && <span className="text-danger">Phone number is required</span>}
        </div>

        <div className="mb-3">
          <label className='inputlabeltext'>*Password</label>
          <input
            type="password"
            className="form-control"
            {...register('password', { required: true })}
          />
          {errors.password && <span className="text-danger">Password is required</span>}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Loading...' : 'Signup'}
        </button>
      </form>
      <div className="mt-3 text-center">
        <p>Already have an account? <a href="/login">Login</a></p>
      </div>
      <ToastContainer />
      {loading && <Loader />} {/* Show loader if loading is true */}
    </div>
  );
};

export default Signup;

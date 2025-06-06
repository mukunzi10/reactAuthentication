import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { setAuth } = useContext(AuthContext);  // Only need to update context
  const navigate = useNavigate();
  const emailRef = useRef(null);

  // Focus on the email input field on load
  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);

  // Redirect to dashboard if already logged in
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('dashboard');
    }
  }, [navigate]);

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      const { token, user } = response.data;

      // Store token and user data in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Set auth context state (use this for in-app state management)
      setAuth({ token, user });

      setSuccess(true);
      navigate('/dashboard');  // Redirect to the dashboard after login
    } catch (error) {
      setError(error.response?.data?.error || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-[400px] p-5 rounded-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">Login successful!</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              ref={emailRef}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-500 text-white py-2 rounded-md shadow-md ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          >
            {loading ? 'Loading...' : 'Login'}
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-500">
          Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

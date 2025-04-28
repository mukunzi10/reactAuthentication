import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        // Optionally fetch user data using the token
        const response = await axios.get('http://localhost:5000/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = response.data;
        setAuth({ token, user });
      } catch (err) {
        setError('Failed to fetch user data. Please log in again.');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate, setAuth]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }
  //logout clear local storage
    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setAuth({ token: null, user: null });
        navigate('/login'); // Redirect to login page after logout
    };
    // You can add a button to trigger the logout function

  // logout handler




  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white w-[400px] p-5 rounded-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Dashboard</h2>
        {auth.user ? (
          <div>
            <h3 className="text-lg font-semibold">Welcome, {auth.user.name}!</h3>
            <p>Email: {auth.user.email}</p>
            {/* logout */}
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded mt-4">Logout</button>
            
            {/* Add more user details or functionality here */}
        
            {/* Display additional user details here */}
          </div>
        ) : (
          <p className="text-center text-red-500">No user data found</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

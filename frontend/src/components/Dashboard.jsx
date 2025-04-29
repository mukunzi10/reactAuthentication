import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Menu, X } from 'lucide-react';

const Dashboard = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showStudents, setShowStudents] = useState(false);
  const navigate = useNavigate();

  const chartData = [
    { name: 'Jan', students: 30 },
    { name: 'Feb', students: 45 },
    { name: 'Mar', students: 60 },
    { name: 'Apr', students: 50 },
    { name: 'May', students: 70 },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

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

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, user: null });
    navigate('/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-lg text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="flex w-full h-screen overflow-hidden">
  {/* Sidebar */}
  {sidebarOpen && (
    <aside className="w-64 bg-blue-800 text-white p-6 space-y-4 fixed md:relative z-10 h-full">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Admin</h2>
        <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
          <X className="w-6 h-6 text-white" />
        </button>
      </div>
      <nav className="space-y-3">
        <a href="/dashboard" className="block hover:bg-blue-700 p-2 rounded">Dashboard</a>
        <a href="/profile" className="block hover:bg-blue-700 p-2 rounded">Profile</a>
        <a href="/settings" className="block hover:bg-blue-700 p-2 rounded">Settings</a>

        {/* Students Dropdown */}
        <div>
          <button
            onClick={() => setShowStudents(!showStudents)}
            className="w-full text-left hover:bg-blue-700 p-2 rounded flex justify-between items-center"
          >
            <span>Students</span>
            <svg
              className={`w-4 h-4 transition-transform ${showStudents ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showStudents && (
            <div className="pl-4 mt-2 space-y-2 text-sm">
              <a href="/students" className="block hover:bg-blue-700 p-2 rounded">View Students</a>

              <a href="/add-student" className="block hover:bg-blue-700 p-2 rounded">Add Student</a>
              <a href="/students/reports" className="block hover:bg-blue-700 p-2 rounded">Student Reports</a>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="block w-full text-left hover:bg-red-600 p-2 rounded text-red-200"
        >
          Logout
        </button>
      </nav>
    </aside>
  )}

  {/* Main Content */}
  <main className={`flex-1 bg-gray-100 p-6 transition-all duration-300 overflow-auto ${sidebarOpen ? 'md:m-1' : ''} h-full`}>
    {/* Topbar for mobile */}
    <div className="md:hidden mb-4">
      <button onClick={() => setSidebarOpen(true)}>
        <Menu className="w-6 h-6 text-gray-700" />
      </button>
    </div>

    {/* Welcome Panel */}
    <div className="bg-white p-6 rounded shadow mb-6">
      <h1 className="text-3xl font-semibold mb-2">Welcome, {auth?.user?.name}!</h1>
      <p className="text-gray-700">Email: {auth?.user?.email}</p>
    </div>

    {/* Chart Panel */}
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Student Enrollment Chart</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="students" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </main>
</div>

  
  );
};

export default Dashboard;

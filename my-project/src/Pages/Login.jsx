import React, { useState } from 'react';
import login from '../college_website/login.jpg';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('user');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminCodeInput, setAdminCodeInput] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex flex-col md:flex-row items-center max-w-6xl w-full shadow-lg rounded-lg overflow-hidden">
        
        <div className="md:w-1/2 w-full">
          <img src={login} alt="login" className="w-full h-full object-cover" />
        </div>

        <div className="md:w-1/2 w-full p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            <h2 className="text-2xl font-bold text-center underline">Login</h2>

            <div className="flex justify-center space-x-6">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="user"
                  checked={role === 'user'}
                  onChange={() => setRole('user')}
                  className="accent-blue-500"
                />
                <span>User</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="admin"
                  checked={role === 'admin'}
                  onChange={() => setRole('admin')}
                  className="accent-blue-500"
                />
                <span>Admin</span>
              </label>
            </div>

            {role === 'user' ? (
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            ) : (
              <div>
                <label className="block text-sm font-medium">Admin Code</label>
                <input
                  type="text"
                  value={adminCodeInput}
                  onChange={(e) => setAdminCodeInput(e.target.value)}
                  placeholder="Enter admin code"
                  className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Login
            </button>
            <p className="text-center text-sm">
              Don’t have an account?{' '}
              <a href="/SignUp" className="text-blue-500 underline">
                Signup
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

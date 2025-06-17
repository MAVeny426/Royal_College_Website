import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../college_website/logo.png';

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem('userRole');
    setRole(storedRole);
  }, []);

  // Render links based on role
  const renderLinks = () => {
    if (role === 'admin') {
      return (
        <>
          <Link to="/Login" className="nav-link">Login</Link>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/Dashboard" className="nav-link">Dashboard</Link>
          <Link to='/' className='nav-link'>Logout</Link>
        </>
      );
    }

    if (role === 'student') {
      return (
        <>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/Assignment" className="nav-link">Add Assignment</Link>
          <Link to="/Attendance" className="nav-link">Student Attendance</Link>
          <Link to="/Account" className="nav-link">Account</Link>
          <Link to="/Login" className="nav-link">Login</Link>
          <Link to="/Applyleave" className="apply-link">APPLY LEAVE</Link>
        </>
      );
    }

    if (role === 'teacher') {
      return (
        <>
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/Assignment" className="nav-link">Add Assignment</Link>
          <Link to="/Attendance" className="nav-link">Student Attendance</Link>
          <Link to="/Account" className="nav-link">Account</Link>
          <Link to="/Studentattendance" className="nav-link">Teacher Mark Attendance</Link>
          <Link to="/Login" className="nav-link">Login</Link>
          <Link to="/Applyleave" className="apply-link">APPLY LEAVE</Link>
        </>
      );
    }

    // Default (no role logged in yet)
    return (
      <>
        <Link to="/SignUp" className="nav-link">SignUp</Link>
        <Link to="/Login" className="nav-link">Login</Link>
      </>
    );
  };

  return (
    <div className="flex justify-between items-center px-6 md:px-24 h-20 bg-white shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="logo" className="w-48 md:w-48" />
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex items-center gap-5 text-sm font-medium">
        {renderLinks()}
      </div>

      {/* Mobile Hamburger Menu */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-black focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
            stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round"
              strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Mobile Navbar */}
      {isMobileMenuOpen && (
        <div className="absolute top-20 left-0 right-0 bg-white shadow-md p-4 flex flex-col items-center md:hidden">
          {renderLinks()}
        </div>
      )}
    </div>
  );
};

export default Navbar;

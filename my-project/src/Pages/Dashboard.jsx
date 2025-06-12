import React, { useEffect } from 'react';
import FeatureSection from '../Components/FeatureSection';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import dashboard from '../college_website/dashboard.jpg';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem('userRole');
    const token = localStorage.getItem('userToken');
  
    if (!token || role !== 'admin') {
      navigate('/', { replace: true });
    }
  }, [navigate]);
  

  return (
    <>
      <Navbar />

      <div className="relative min-h-screen font-sans overflow-hidden">
        <div
          className="absolute inset-0 z-0"style={{backgroundImage: `url(${dashboard})`,backgroundSize: 'cover',backgroundPosition: 'center',
          }}
        ></div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center text-white">
          <p className="text-5xl font-bold mb-10 drop-shadow">Welcome</p>
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {/* <select
              className="bg-white text-black py-2 px-4 rounded shadow font-semibold"
              onChange={(e) => {
                if (e.target.value === 'add') navigate('/addstudent');
              }}
            >
              <option value="">Student</option>
              <option value="add">Add Student</option>
              <option value="update">Update Student</option>
              <option value="delete">Delete Student</option>
            </select> */}

            <select
              className="bg-white text-black py-2 px-4 rounded shadow font-semibold"
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'add') navigate('/AddTeacher');
                else if (value === 'update') navigate('/UpdateTeacher');
                else if (value === 'delete') navigate('/DeleteTeacher');
              }}
            >
              <option value="">Teacher</option>
              <option value="add">Add Teacher</option>
              <option value="update">Update Teacher</option>
              <option value="delete">Delete Teacher</option>
            </select>

            <select
              className="bg-white text-black py-2 px-4 rounded shadow font-semibold"
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'add') navigate('/addcourse');
                else if (value ==='update') navigate ('/Updatecourse')
              }}
            >
              <option value="">Course</option>
              <option value="add">Add Course</option>
              <option value="update">Update Course</option>
              <option value="delete">Delete Course</option>
            </select>
          </div>

          <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48">
            <FeatureSection />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

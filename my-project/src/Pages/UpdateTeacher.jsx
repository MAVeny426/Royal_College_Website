import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import updateteacher from '../college_website/updateteacher.jpeg'; // Your image path

const UpdateTeacher = () => {
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg max-w-5xl w-full rounded-lg overflow-hidden">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 w-full flex items-center justify-center bg-gray-200">
          <img
            src={updateteacher}
            alt="Update Teacher"
            className="object-cover h-full w-full"
          />
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 w-full p-8">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Update Teacher</h2>
          <form  className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                // value={Name
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                // value={Email}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Course</label>
              <select
                // value={Course}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {/* Uncomment if you want dynamic courses */}
                {/* <option value="">Select a course</option>
                {courses.map(course => (
                  <option key={course._id} value={course.name}>{course.name}</option>
                ))} */}
                <option value="Blockchain">Blockchain</option>
                <option value="Cyber Security">Cyber Security</option>
                <option value="PCB Designs">PCB Designs</option>
                <option value="English">English</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Batch</label>
              <input
                type="text"
                // value={Batch}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Role</label>
              <select
                // value={Role}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="Teacher">Teacher</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Year</label>
              <input
                type="number"
                // value={Year}
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-purple-700 text-white py-3 rounded-full font-semibold transition duration-300"
            >
              Update Teacher
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTeacher;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import addteacher from '../college_website/addteacher.jpeg'; // Your image path

const AddTeacher = () => {
  

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg max-w-7xl w-full rounded-lg overflow-hidden p-10">
        {/* Left Side - Image */}
        <div className="lg:w-1/2 w-full flex items-center justify-center bg-gray-200 min-h-[600px]">
          <img
            src={addteacher}
            alt="Add Teacher"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Side - Form */}
        <div className="lg:w-1/2 w-full p-10">
          <h2 className="text-3xl font-bold text-blue-800 mb-6 text-center">Add Teacher</h2>
          <form  className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Name</label>
              <input
                type="text"
                // value={Name}
                // onChange={(e) => setName(e.target.value)}
                required
                placeholder="eg. Veny M A"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Email</label>
              <input
                type="email"
                // value={Email}
                // onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="eg. venyma504@gmail.com"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Course</label>
              <select
                // value={Course}
                // onChange={(e) => setCourse(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {/* Uncomment below if you want to use dynamic courses */}
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
                // onChange={(e) => setBatch(e.target.value)}
                placeholder="2025"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Role</label>
              <select
                // value={Role}
                // onChange={(e) => setRole(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled
              >
                <option value="teacher">Teacher</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Year</label>
              <input
                type="number"
                // value={Year}
                // onChange={(e) => setYear(e.target.value)}
                placeholder="2025"
                className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-800 hover:bg-purple-700 text-white py-3 rounded-full font-semibold transition duration-300"
            >
              Add Teacher
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTeacher;

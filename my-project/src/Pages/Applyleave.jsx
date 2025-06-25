import React, { useState, useEffect } from 'react';
import leave from '../college_website/leave.jpg';
import Navbar from '../Components/Navbar';

const Applyleave = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    student_code: '',
    reason: '',
    description: '',
    leave_date: ''
  });

  // Fetch profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/student/profile', {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (!res.ok) throw new Error('Failed to fetch profile');

        const data = await res.json();
        const { name, email, student_code } = data;

        setFormData(prev => ({
          ...prev,
          name,
          email,
          student_code
        }));
      } catch (err) {
        console.error('Failed to load profile', err.message);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/api/student/apply', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      alert(data.message || 'Application submitted');

      setFormData({
        name: '',
        email: '',
        student_code: '',
        reason: '',
        description: '',
        leave_date: ''
      });
    } catch (err) {
      console.error('Submission error:', err.message);
      alert('Failed to submit application');
    }
  };

  return (
    <div className="bg-blue-200 min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center py-10 px-4">
        <div className="flex flex-col lg:flex-row bg-white w-full max-w-6xl rounded-xl shadow-lg overflow-hidden">
          <div className="lg:w-1/2 bg-gray-100 flex items-center justify-center p-4">
            <img src={leave} alt="Leave" className="w-full h-auto rounded-lg object-cover" />
          </div>

          <div className="lg:w-1/2 p-8 flex items-center justify-center">
            <form className="w-full" onSubmit={handleSubmit}>
              <p className="border-y-2 border-green-600 text-2xl text-center py-3 mb-6 font-semibold">
                Leave Application
              </p>

              <div className="flex flex-col gap-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300"
                  readOnly
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300"
                  readOnly
                />
                <input
                  type="text"
                  name="student_code"
                  placeholder="Student Code"
                  value={formData.student_code}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300"
                  readOnly
                />
                <input
                  type="text"
                  name="reason"
                  placeholder="Reason for Leave"
                  value={formData.reason}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300"
                  required
                />
                <textarea
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  className="p-3 rounded-md border border-gray-300"
                />
                <input
                  type="date"
                  name="leave_date"
                  value={formData.leave_date}
                  onChange={handleChange}
                  className="p-3 rounded-md border border-gray-300"
                  required
                />

                <button
                  type="submit"
                  className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md w-48 mx-auto"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Applyleave;

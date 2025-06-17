// src/pages/AddBatch.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import dashboard from '../college_website/dashboard.jpg';

const AddBatch = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const course_id = location.state?.course_id;

  const [batchForm, setBatchForm] = useState({
    batch_name: '',
    start_date: '',
    end_date: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!course_id) {
      setMessage('❌ No course selected');
    }
  }, [course_id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBatchForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!course_id) return;

    try {
      const res = await fetch('http://localhost:3000/api/admin/addbatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          course_id: parseInt(course_id),
          ...batchForm,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setMessage(`❌ ${data.message}`);
        return;
      }

      setMessage('✅ Batch added successfully');
      setTimeout(() => navigate('/AllCourses'), 1500); // go back after success
    } catch (error) {
      console.error(error);
      setMessage('❌ Failed to add batch');
    }
  };

  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${dashboard})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="flex h-full w-full justify-center items-center">
          <div className="bg-white bg-opacity-90 p-8 rounded-lg w-[400px]">
            <h2 className="text-2xl font-bold mb-4 text-blue-700">Add New Batch</h2>

            {message && <p className={`mb-4 ${message.startsWith('✅') ? 'text-green-600' : 'text-red-600'}`}>{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="batch_name"
                placeholder="Batch Name"
                value={batchForm.batch_name}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="start_date"
                value={batchForm.start_date}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <input
                type="date"
                name="end_date"
                value={batchForm.end_date}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded"
              />
              <button type="submit" className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700">
                Add Batch
              </button>
              <button
                type="button"
                onClick={() => navigate('/updatecourse')}
                className="bg-gray-500 text-white w-full py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBatch;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import dashboard from '../college_website/dashboard.jpg';

const EditBatch = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const batch = location.state?.batch;

  const [formData, setFormData] = useState({
    batch_name: batch?.batch_name || '',
    year: batch?.year || '',
    start_date: batch?.start_date?.slice(0, 10) || '',
    end_date: batch?.end_date?.slice(0, 10) || '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/api/admin/updateBatch/${batch.batch_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const result = await res.json();

      if (res.ok) {
        alert('Batch updated successfully');
        navigate(-1); // Go back
      } else {
        alert(result.message || 'Failed to update batch');
      }
    } catch (err) {
      console.error('Update error:', err);
      alert('Error updating batch');
    }
  };

  return (
    <div className="relative h-screen w-full overflow-auto">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${dashboard})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex justify-center items-start pt-20">
          <form
            onSubmit={handleSubmit}
            className="bg-white bg-opacity-95 rounded-lg shadow-md p-10 w-[600px] space-y-6"
          >
            <h2 className="text-2xl font-bold text-blue-700 text-center">Edit Batch</h2>

            <div>
              <label className="block font-semibold text-gray-700">Batch Name</label>
              <input
                type="text"
                name="batch_name"
                value={formData.batch_name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Year</label>
              <input
                type="number"
                name="year"
                value={formData.year}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">Start Date</label>
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700">End Date</label>
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              >
                Update Batch
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditBatch;

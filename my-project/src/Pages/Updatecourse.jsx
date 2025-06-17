import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboard from '../college_website/dashboard.jpg';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Updatecourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [formData, setFormData] = useState({
    course_name: '',
    course_code: '',
    department: '',
    duration_years: '',
    is_active: true,
  });
  const [batches, setBatches] = useState([]);
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/admin/getcourse', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setCourses(data.courses || []))
      .catch(err => console.error('Error fetching courses:', err));
  }, []);

  const handleCourseSelect = e => {
    const id = e.target.value;
    setSelectedCourseId(id);
    setMessage('');

    const found = courses.find(c => c.course_id === parseInt(id));
    if (found) {
      setFormData({
        course_name: found.course_name || '',
        course_code: found.course_code || '',
        department: found.department || '', // auto-filled from backend
        duration_years: found.duration_years || '',
        is_active: found.is_active,
      });
    } else {
      setFormData({
        course_name: '',
        course_code: '',
        department: '',
        duration_years: '',
        is_active: true,
      });
      setBatches([]);
    }

    if (id) {
      fetch(`http://localhost:3000/api/admin/getbatches?course_id=${id}`, {
        credentials: 'include',
      })
        .then(res => res.json())
        .then(data => setBatches(data.batches || []))
        .catch(err => console.error('Error fetching batches:', err));
    }
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!selectedCourseId) return;

    try {
      const res = await fetch('http://localhost:3000/api/admin/updateCourse', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          course_id: parseInt(selectedCourseId),
          ...formData,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(`❌ ${data.message}`);
        return;
      }

      setMessage('✅ Course updated successfully');
    } catch (err) {
      console.error('Update failed:', err);
      setMessage('❌ Failed to update course');
    }
  };

  const handleDeleteBatch = async batchId => {
    if (!window.confirm('Are you sure you want to delete this batch?')) return;

    try {
      const res = await fetch(`http://localhost:3000/api/admin/deletebatch/${batchId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setBatches(prev => prev.filter(batch => batch.batch_id !== batchId));
        setMessage('✅ Batch deleted successfully');
      } else {
        const data = await res.json();
        setMessage(`❌ ${data.message || 'Failed to delete batch'}`);
      }
    } catch (err) {
      console.error('Delete batch error:', err);
      setMessage('❌ Failed to delete batch');
    }
  };

  return (
    <div className="relative h-screen w-full overflow-y-auto">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: `url(${dashboard})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        <div className="flex h-full w-full justify-center items-start overflow-y-auto">
          <div className="bg-blue-500 bg-opacity-80 w-[800px] h-auto mt-[100px] p-10 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Course</h2>

            <form className="space-y-4" id="update-course-form" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-white">Select Course</label>
                <select
                  className="w-full p-2 rounded text-black"
                  value={selectedCourseId}
                  onChange={handleCourseSelect}
                  required
                >
                  <option value="">Choose course</option>
                  {courses.map(course => (
                    <option key={course.course_id} value={course.course_id}>
                      {course.course_name} ({course.course_code})
                    </option>
                  ))}
                </select>
              </div>

              {selectedCourseId && (
                <>
                  <div>
                    <label className="block mb-1 text-white">Course Name</label>
                    <input
                      name="course_name"
                      value={formData.course_name}
                      onChange={handleChange}
                      className="w-full p-2 rounded text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-white">Course Code</label>
                    <input
                      name="course_code"
                      value={formData.course_code}
                      onChange={handleChange}
                      className="w-full p-2 rounded text-black"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-white">Department</label>
                    <input
                      name="department"
                      value={formData.department}
                      className="w-full p-2 rounded text-black bg-gray-200"
                      readOnly
                    />
                  </div>

                  <div>
                    <label className="block mb-1 text-white">Duration (Years)</label>
                    <input
                      type="number"
                      name="duration_years"
                      value={formData.duration_years}
                      onChange={handleChange}
                      className="w-full p-2 rounded text-black"
                      min={1}
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label className="text-white font-semibold">Is Active</label>
                  </div>
                </>
              )}
            </form>

            {selectedCourseId && (
              <div className="mt-8 text-black bg-white bg-opacity-80 p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">Batch Details</h3>

                {batches.length > 0 ? (
                  <ul className="list-disc ml-6 space-y-2">
                    {batches.map(batch => (
                      <li key={batch.batch_id} className="flex justify-between items-center">
                        <span>
                          <span className="font-semibold">Batch:</span> {batch.batch_name} |{' '}
                          <span className="font-semibold">Year:</span> {batch.year || 'N/A'}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">No batches available for this course.</p>
                )}

                <button
                  type="submit"
                  form="update-course-form"
                  className="mt-6 bg-blue-600 text-white font-semibold px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update Course
                </button>
              </div>
            )}

            {message && (
              <p className="mt-4 text-center">
                <span className={message.startsWith('✅') ? 'text-green-300' : 'text-red-300'}>
                  {message}
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatecourse;

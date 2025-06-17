import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import dashboard from '../college_website/dashboard.jpg';

const ViewCourse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const course_id = location.state?.course_id;
  const refresh = location.state?.refresh; // to trigger refetch after AddBatch

  const [course, setCourse] = useState(null);
  const [batches, setBatches] = useState([]);

  useEffect(() => {
    if (!course_id) return;

    fetch(`http://localhost:3000/api/admin/getCourse/${course_id}`, {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        setBatches(data.batches || []);
      })
      .catch((err) => console.error("Error fetching course:", err));
  }, [course_id, refresh]); // refetch if refresh flag changes

  const handleDelete = async (batch_id) => {
    const confirm = window.confirm("Are you sure you want to delete this batch?");
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/api/admin/deleteBatch/${batch_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      const result = await res.json();

      if (res.ok) {
        alert("Batch deleted successfully!");
        setBatches(batches.filter((batch) => batch.batch_id !== batch_id));
      } else {
        alert(result.message || "Failed to delete batch.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting batch.");
    }
  };

  const handleEdit = (batch) => {
    navigate("/EditBatch", { state: { batch } });
  };

  const handleAddBatch = () => {
    navigate('/addbatch', { state: { course_id } });
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
          <div className="bg-white bg-opacity-95 rounded-lg shadow-md p-10 w-[700px]">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Course Details</h2>
            {course ? (
              <div className="space-y-4 text-lg">
                <p><strong>Course ID:</strong> {course.course_id}</p>
                <p><strong>Name:</strong> {course.course_name}</p>
                <p><strong>Code:</strong> {course.course_code}</p>
                <p><strong>Department:</strong> {course.department}</p>
                <p><strong>Duration (Years):</strong> {course.duration_years}</p>
                {/* <p><strong>Description:</strong> {course.description || "N/A"}</p> */}

                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-blue-600 mb-2">Batches</h3>
                  {batches.length > 0 ? (
                    <ul className="space-y-3 text-gray-800">
                      {batches.map((batch) => (
                        <li key={batch.batch_id} className="flex justify-between items-center bg-gray-100 px-4 py-2 rounded">
                          <div>
                            <strong>{batch.batch_name}</strong> – {batch.year} (
                            {new Date(batch.start_date).toLocaleDateString()} to{" "}
                            {new Date(batch.end_date).toLocaleDateString()})
                          </div>
                          <div className="flex gap-3 text-blue-700">
                            <FaEdit
                              className="cursor-pointer hover:text-blue-900"
                              onClick={() => handleEdit(batch)}
                            />
                            <FaTrash
                              className="cursor-pointer hover:text-red-600"
                              onClick={() => handleDelete(batch.batch_id)}
                            />
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-700">No batches available for this course.</p>
                  )}

                  {/* + Add Batch Button */}
                  <button
                    onClick={handleAddBatch}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                  >
                    + Add Batch
                  </button>
                </div>

                {/* Back Button */}
                <button
                  onClick={() => navigate('/AllCourses')}
                  className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Back to All Courses
                </button>
              </div>
            ) : (
              <p className="text-center text-gray-700">Loading course details...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;

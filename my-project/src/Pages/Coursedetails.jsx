import React, { useState, useEffect } from 'react';
import dashboard from '../college_website/dashboard.jpg';

const Coursedetails = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/api/admin/getcourse', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch course details');
      }

      const data = await response.json();
      setCourses(data.courses); // expecting data.courses = array of courses
      console.log(data.courses);
      setError(null);
    } catch (err) {
      console.log('Error fetching course details:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
  }, []);

  return (
    <div className="relative min-h-screen p-6">
      {/* Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${dashboard})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.7)',
        }}
      ></div>

      {/* Foreground */}
      <div className="relative z-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
        <h1 className="text-3xl font-semibold mb-4 text-center">Course Details</h1>

        {loading && <p>Loading courses...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}

        {!loading && !error && (
          <table className="w-full table-auto border border-gray-300 shadow-sm bg-white rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">Course Name</th>
                <th className="px-4 py-2 border">Code</th>
                <th className="px-4 py-2 border">Department</th>
                <th className="px-4 py-2 border">Duration (Years)</th>
                <th className="px-4 py-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
                {courses.map((course, index) => (
                            <tr key={index} className="text-center">
                            <td className="px-4 py-2 border capitalize">{course.course_name}</td>
                            <td className="px-4 py-2 border">{course.course_code}</td>
                            <td className="px-4 py-2 border">{course.department}</td>
                            <td className="px-4 py-2 border">{course.duration_years}</td>
                            <td className="px-4 py-2 border">{course.is_active ? 'Active' : 'Inactive'}</td>
                            </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Coursedetails;

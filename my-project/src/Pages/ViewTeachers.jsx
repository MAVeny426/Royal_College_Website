import React, { useEffect, useState } from 'react';
import dashboard from '../college_website/dashboard.jpg';

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/getTeacherNames', {
        method: 'GET',
        credentials: 'include', // important if using cookies for auth
      });

      if (!response.ok) {
        throw new Error('Failed to fetch teacher names');
      }

      const data = await response.json();
      setTeachers(data.teachers);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  return (
    <div className="relative min-h-screen p-6">
      <div
        className="absolute inset-0 z-0" style={{ backgroundImage: `url(${dashboard})`,backgroundSize: 'cover',backgroundPosition: 'center',filter: 'brightness(0.7)',
        }}
      ></div>
  
      <div className="relative z-10 bg-white bg-opacity-90 p-6 rounded-lg shadow-lg max-w-xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4 text-center">Teachers List</h1>
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        <ul className="list-disc list-inside">
          {teachers.map((teacher) => (
            <li key={teacher.user_id} className="mb-1 capitalize">
              {teacher.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}  

export default ViewTeachers;

import React, { useEffect, useState } from 'react';
import dashboard from '../college_website/dashboard.jpg';

const ViewTeachers = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/admin/getTeacherNames', {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch teacher names');
      }

      const data = await response.json();
      const sorted = data.teachers.sort((a, b) => b.experience - a.experience);
      setTeachers(sorted);
      setFilteredTeachers(sorted);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching teachers:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    const filtered = teachers
      .filter((teacher) => {
        const subjectText = Array.isArray(teacher.subject_taught)
          ? teacher.subject_taught.join(', ').toLowerCase()
          : teacher.subject_taught?.toLowerCase() || '';
        return subjectText.includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => b.experience - a.experience);

    setFilteredTeachers(filtered);
  };

  useEffect(() => {
    fetchTeachers();
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
          filter: 'brightness(0.6)',
        }}
      ></div>

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto bg-white bg-opacity-90 p-8 rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Teachers by Course</h1>

        {/* Search bar with button */}
        <div className="flex flex-col sm:flex-row items-center justify-center mb-6 gap-3">
          <input
            type="text"
            placeholder="Search by course name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Search
          </button>
        </div>

        {/* Feedback */}
        {loading && <p className="text-center text-gray-600">Loading...</p>}
        {error && <p className="text-red-500 text-center">Error: {error}</p>}
        {!loading && !error && filteredTeachers.length === 0 && (
          <p className="text-center text-gray-600">No teachers found for "{searchTerm}"</p>
        )}

        {/* Teacher Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher, index) => (
            <div
              key={teacher.user_id || index}
              className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-2">{teacher.name}</h2>

              <p className="text-sm text-gray-700">
                <span className="font-medium">Subjects:</span>{" "}
                {Array.isArray(teacher.subject_taught)
                  ? teacher.subject_taught.join(", ")
                  : teacher.subject_taught}
              </p>

              <p className="mt-2">
                <span className="inline-block bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                  {teacher.experience} {teacher.experience === 1 ? "year" : "years"} experience
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewTeachers;

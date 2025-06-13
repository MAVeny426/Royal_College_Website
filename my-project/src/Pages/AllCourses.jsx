import React, { useEffect, useState } from 'react';
import dashboard from '../college_website/dashboard.jpg';

const AllCourses = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/getAllCourses", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

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
        <div className="flex h-full w-full justify-center items-start">
          <div className="bg-blue-600 bg-opacity-80 w-[800px] mt-[100px] p-10 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">All Courses</h2>
            {courses.length === 0 ? (
              <p className="text-center">No courses found.</p>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr>
                    <th className="border-b pb-2">No. </th>
                    <th className="border-b pb-2">Course Name</th>
                    <th className="border-b pb-2">Course Code</th>
                    <th className="border-b pb-2">Department</th>
                    <th className="border-b pb-2">Duration (Years)</th>
                  </tr>
                </thead>
                <tbody>
                  {courses.map((course, index) => (
                    <tr key={course.course_id} className="hover:bg-blue-700">
                      <td className="py-2">{index + 1}</td>
                      <td className="py-2">{course.course_name}</td>
                      <td className="py-2">{course.course_code}</td>
                      <td className="py-2">{course.department}</td>
                      <td className="py-2">{course.duration_years || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCourses;

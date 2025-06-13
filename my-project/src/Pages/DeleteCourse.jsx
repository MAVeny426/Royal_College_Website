import React, { useEffect, useState } from 'react';
import dashboard from '../college_website/dashboard.jpg';

const DeleteCourse = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/admin/getAllCourses", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setCourses(data.courses || []))
      .catch((err) => console.error("Error fetching courses:", err));
  }, []);

  const handleDelete = async (course_id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/admin/deleteCourse/${course_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      alert(data.message);

      if (res.ok) {
        setCourses(courses.filter((c) => c.course_id !== course_id));
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div className="relative h-screen w-full">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${dashboard})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex h-full w-full justify-center items-start">
          <div className="bg-blue-600 bg-opacity-80 w-[800px] h-auto mt-[100px] p-10 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Delete Course</h2>
            <ul className="space-y-4">
              {courses.map((course) => (
                <li
                  key={course.course_id}
                  className="flex justify-between items-center bg-blue-800 px-4 py-3 rounded"
                >
                  <span>{course.course_name}</span>
                  <button
                    onClick={() => handleDelete(course.course_id)}
                    className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteCourse;

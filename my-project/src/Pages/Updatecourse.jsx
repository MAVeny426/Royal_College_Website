// src/pages/Updatecourse.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import dashboard from '../college_website/dashboard.jpg';

const Updatecourse = () => {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/api/admin/getcourse', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        setCourses(data.courses || []);
      })
      .catch((err) => console.error('Error fetching courses:', err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCourseId) return;
    navigate(`/EditCourseDetails/${selectedCourseId}`);
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
          <div className="bg-blue-500 bg-opacity-80 w-[800px] h-auto mt-[100px] p-10 rounded-lg shadow-lg text-white">
            <h2 className="text-2xl font-bold mb-6 text-center">Update Course</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-white">Select Course</label>
                <select
                  className="w-full p-2 rounded text-black"
                  value={selectedCourseId}
                  onChange={(e) => setSelectedCourseId(e.target.value)}
                  required
                >
                  <option value="">Choose course</option>
                  {courses.map((course) => (
                    <option key={course.course_id} value={course.course_id}>
                      {course.course_name} ({course.course_code})
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-white text-blue-600 font-semibold px-4 py-2 rounded hover:bg-blue-100"
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Updatecourse;


// import React, { useEffect, useState } from 'react';

// const UpdateCourse = () => {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourseId, setSelectedCourseId] = useState("");
//   const [formData, setFormData] = useState({
//     course_name: "",
//     course_code: "",
//     department: "",
//     duration_years: "",
//     is_active: true,
//   });
//   const [message, setMessage] = useState("");

//   // Fetch all courses
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const res = await fetch("http://localhost:3000/api/admin/getcourse", {
//           credentials: "include",
//         });
//         const data = await res.json();
//         console.log(data);
        
//         setCourses(data.courses || []);
//       } catch (err) {
//         console.error("Error fetching courses:", err);
//       }
//     };
//     fetchCourses();
//   }, []);

//   // When course is selected, populate form
//   const handleCourseSelect = (e) => {
//     const courseId = e.target.value;
//     setSelectedCourseId(courseId);

//     const selected = courses.find((course) => course.course_id === parseInt(courseId));
//     if (selected) {
//       setFormData({
//         course_name: selected.course_name || "",
//         course_code: selected.course_code || "",
//         department: selected.department || "",
//         duration_years: selected.duration_years || "",
//         is_active: selected.is_active,
//       });
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedCourseId) {
//       setMessage("Please select a course first.");
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:3000/api/admin/updateCourse", {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify({
//           course_id: parseInt(selectedCourseId),
//           ...formData,
//         }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         setMessage("✅ Course updated successfully");
//       } else {
//         setMessage(`❌ ${data.message}`);
//       }
//     } catch (err) {
//       console.error("Update failed:", err);
//       setMessage("❌ Failed to update course");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-700 flex items-center justify-center">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xl">
//         <h2 className="text-2xl font-bold text-center mb-6">Update Course</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div>
//             <label className="block font-semibold">Select Course</label>
//             <select value={selectedCourseId} onChange={handleCourseSelect} className="w-full p-2 border rounded">
//               <option value="">-- Choose a course --</option>
//               {courses.map((course) => (
//                 <option key={course.course_id} value={course.course_id}>
//                   {course.course_name} ({course.course_code})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div>
//             <label className="block font-semibold">Course Name</label>
//             <input
//               name="course_name"
//               value={formData.course_name}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-semibold">Course Code</label>
//             <input
//               name="course_code"
//               value={formData.course_code}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               required
//             />
//           </div>

//           <div>
//             <label className="block font-semibold">Department</label>
//             <input
//               name="department"
//               value={formData.department}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//             />
//           </div>

//           <div>
//             <label className="block font-semibold">Duration (Years)</label>
//             <input
//               type="number"
//               name="duration_years"
//               value={formData.duration_years}
//               onChange={handleChange}
//               className="w-full p-2 border rounded"
//               min={1}
//             />
//           </div>

//           <div className="flex items-center">
//             <input
//               type="checkbox"
//               name="is_active"
//               checked={formData.is_active}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             <label className="font-semibold">Is Active</label>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
//           >
//             Update Course
//           </button>

//           {message && <p className="text-center mt-4 text-red-600">{message}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default UpdateCourse;


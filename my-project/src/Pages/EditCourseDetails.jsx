import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dashboard from '../college_website/dashboard.jpg';

const EditCourseDetails = () => {
  const { id } = useParams(); // course_id
  const [course, setCourse] = useState(null);
  const [batch, setBatch] = useState(null);
  const [durationYears, setDurationYears] = useState('');

  useEffect(() => {
    // Fetch course details
    fetch(`http://localhost:3000/api/admin/getCourseById/${id}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setCourse(data.course);
        setDurationYears(data.course.duration_years || '');
      })
      .catch((err) => console.error('Error fetching course:', err));

    // Fetch batch by course_id
    fetch(`http://localhost:3000/api/admin/getBatchByCourseId/${id}`, { credentials: 'include' })
      .then((res) => res.json())
      .then((data) => {
        setBatch(data.batch);
      })
      .catch((err) => console.error('Error fetching batch:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // 1. Create new batch
      const batchRes = await fetch("http://localhost:3000/api/admin/addBatch", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          batch_name: batch.batch_name,
          year: batch.year,
          start_date: batch.start_date,
          end_date: batch.end_date,
          course_id: course.course_id,
        }),
      });
  
      const batchResult = await batchRes.json();
  
      // 2. Update course duration
      const courseRes = await fetch("http://localhost:3000/api/admin/updateCourse", {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          course_id: course.course_id,
          duration_years: durationYears,
        }),
      });
  
      const courseResult = await courseRes.json();
  
      alert(`✅ ${batchResult.message} & ${courseResult.message}`);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert("Failed to submit changes.");
    }
  };
  

  if (!course || !batch) return <div className="text-center mt-10 text-white">Loading...</div>;

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
            <h2 className="text-2xl font-bold mb-6 text-center">Edit Batch Details</h2>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Course info (readonly) */}
              <div>
                <label className="block mb-1">Course Name</label>
                <input type="text" value={course.course_name} disabled className="w-full p-2 rounded text-black" />
              </div>
              <div>
                <label className="block mb-1">Course Code</label>
                <input type="text" value={course.course_code} disabled className="w-full p-2 rounded text-black" />
              </div>
              <div>
                <label className="block mb-1">Department</label>
                <input type="text" value={course.department} disabled className="w-full p-2 rounded text-black" />
              </div>

              {/* Editable Batch Details */}
              <div>
                <label className="block mb-1">Batch Name</label>
                <input
                  type="text"
                  value={batch.batch_name}
                  onChange={(e) => setBatch({ ...batch, batch_name: e.target.value })}
                  className="w-full p-2 rounded text-black"
                />
              </div>
              <div>
                <label className="block mb-1">Year</label>
                <input
                  type="number"
                  value={batch.year}
                  onChange={(e) => setBatch({ ...batch, year: e.target.value })}
                  className="w-full p-2 rounded text-black"
                />
              </div>
              <div>
                <label className="block mb-1">Start Date</label>
                <input
                  type="date"
                  value={batch.start_date?.slice(0, 10)} // Ensure correct format
                  onChange={(e) => setBatch({ ...batch, start_date: e.target.value })}
                  className="w-full p-2 rounded text-black"
                />
              </div>
              <div>
                <label className="block mb-1">End Date</label>
                <input
                  type="date"
                  value={batch.end_date?.slice(0, 10)}
                  onChange={(e) => setBatch({ ...batch, end_date: e.target.value })}
                  className="w-full p-2 rounded text-black"
                />
              </div>

              <button
                type="submit"
                className="bg-white text-blue-700 font-semibold px-4 py-2 rounded hover:bg-blue-100"
              >
                Save Batch Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCourseDetails;

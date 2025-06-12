import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import updateteacher from "../college_website/updateteacher.jpeg";

const UpdateTeacher = () => {
  const [teachers, setTeachers] = useState([]);
  const [selectedName, setSelectedName] = useState("");
  const [teacherDetails, setTeacherDetails] = useState(null);
  const [subjectsTaughtList, setSubjectsTaughtList] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeacherNames = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/admin/getTeacherNames", {
          credentials: "include",
        });
        const data = await res.json();
        setTeachers(data.teachers || []);
      } catch (err) {
        setError("Failed to fetch teacher names");
      }
    };
    fetchTeacherNames();
  }, []);

  useEffect(() => {
    if (!selectedName) {
      setTeacherDetails(null);
      setSubjectsTaughtList([]);
      setScheduleList([]);
      return;
    }
  
    const fetchTeacherDetails = async () => {
      try {
        const res = await fetch(
          `http://localhost:3000/api/teach/getProfileDetails?name=${selectedName}`,
          { credentials: "include" }
        );
        const data = await res.json();
        const teacher = data.teachers && data.teachers[0];
  
        setTeacherDetails(teacher || null);
        setSubjectsTaughtList(Array.isArray(teacher?.subjects_taught) ? teacher.subjects_taught : []);
  
        let rawSchedule = teacher?.schedule;
  
        if (Array.isArray(rawSchedule)) {
          const parsed = [];
  
          for (let i = 0; i < rawSchedule.length; i++) {
            const item = rawSchedule[i];
  
            if (typeof item === "string" && item.includes(":")) {
              // "Monday: 10-12"
              const [day, time] = item.split(":").map((str) => str.trim());
              parsed.push({ day, time });
            } else if (typeof item === "object" && item.day && item.time) {
              parsed.push({ day: item.day, time: item.time });
            } else if (
              typeof item === "string" &&
              i + 1 < rawSchedule.length &&
              typeof rawSchedule[i + 1] === "string"
            ) {
              // handle ["Monday", "10-12"]
              parsed.push({ day: item.trim(), time: rawSchedule[i + 1].trim() });
              i++; // skip next item
            }
          }
  
          setScheduleList(parsed);
        } else {
          setScheduleList([]);
        }
      } catch (err) {
        setError("Failed to fetch teacher details");
      }
    };
    fetchTeacherDetails();
  }, [selectedName]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:3000/api/admin/updateTeacherSchedule", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          name: selectedName,
          subjectsTaught: subjectsTaughtList,
          schedule: scheduleList,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Teacher updated successfully");
        navigate("/Dashboard");
      } else {
        setError(data.message || "Update failed");
      }
    } catch (err) {
      setError("Error during submission");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6 font-sans">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg max-w-5xl w-full rounded-lg overflow-hidden">
        <div className="lg:w-1/2 w-full flex items-center justify-center bg-gray-200">
          <img src={updateteacher} alt="Update Teacher" className="object-cover h-full w-full" />
        </div>
        <div className="lg:w-1/2 w-full p-8">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Update Teacher</h2>
          {error && <div className="text-red-500 text-center mb-2">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Select Name</label>
              <select
                value={selectedName}
                onChange={(e) => setSelectedName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-4 py-2"
              >
                <option value="">Select a teacher</option>
                {teachers.map((t) => (
                  <option key={t.user_id} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            {teacherDetails && (
              <>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Name</label>
                  <input
                    type="text"
                    value={teacherDetails.teacher_name || ""}
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Qualification</label>
                  <input
                    type="text"
                    value={teacherDetails.qualification || ""}
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Department</label>
                  <input
                    type="text"
                    value={teacherDetails.department || ""}
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Experience</label>
                  <input
                    type="number"
                    value={teacherDetails.experience_years || ""}
                    readOnly
                    className="w-full border border-gray-300 rounded px-4 py-2 bg-gray-100"
                  />
                </div>

                {/* Subjects Taught */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Subjects Taught</label>
                  {subjectsTaughtList.map((subject, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => {
                          const updated = [...subjectsTaughtList];
                          updated[idx] = e.target.value;
                          setSubjectsTaughtList(updated);
                        }}
                        className="flex-1 border border-gray-300 rounded px-3 py-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = subjectsTaughtList.filter((_, i) => i !== idx);
                          setSubjectsTaughtList(updated);
                        }}
                        className="text-red-500 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setSubjectsTaughtList([...subjectsTaughtList, ""])}
                    className="mt-1 text-blue-500 font-medium"
                  >
                    + Add Subject
                  </button>
                </div>

                {/* Schedule Editable List */}
                <div>
                  <label className="block text-gray-700 font-semibold mb-1">Schedule</label>
                  {scheduleList.map((slot, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input
                        type="text"
                        placeholder="Day"
                        value={slot.day?.replace(/['"]+/g, "") || ""}
                        onChange={(e) => {
                          const updated = [...scheduleList];
                          updated[idx].day = e.target.value;
                          setScheduleList(updated);
                        }}
                        className="w-1/2 border border-gray-300 rounded px-3 py-1"
                      />
                      <input
                        type="text"
                        placeholder="Time"
                        value={slot.time?.replace(/^(time:)?\s*["']?(.+?)["']?$/i, "$2") || ""}
                        onChange={(e) => {
                          const updated = [...scheduleList];
                          updated[idx].time = e.target.value;
                          setScheduleList(updated);
                        }}
                        className="w-1/2 border border-gray-300 rounded px-3 py-1"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const updated = scheduleList.filter((_, i) => i !== idx);
                          setScheduleList(updated);
                        }}
                        className="text-red-500 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setScheduleList([...scheduleList, { day: "", time: "" }])}
                    className="mt-1 text-blue-500 font-medium"
                  >
                    + Add Slot
                  </button>
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-purple-700 text-white py-3 rounded-full font-semibold"
                >
                  Update Teacher
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTeacher;

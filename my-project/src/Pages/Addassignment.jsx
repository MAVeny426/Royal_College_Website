import React, { useState } from 'react';
import Navbar from '../Components/Navbar';



const Addassignment = () => {
  const [formData, setFormData] = useState({
    title: '',
    submission_date: '',
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const payload = new FormData();
    payload.append('title', formData.title);
    payload.append('submission_date', formData.submission_date);
    payload.append('file', file);

    const response = await fetch("http://localhost:3000/api/student/addAssignment", {
      method: "POST",
      body: payload,
    });
    
    let result;
    
    try {
      result = await response.json(); // This fails if no/invalid JSON
    } catch (jsonErr) {
      console.error("Invalid JSON response from server:", jsonErr);
      const text = await response.text();
      console.error("Raw response text:", text);
      return alert("Server error. Please try again later.");
    }
    
    if (response.ok) {
      alert("Assignment submitted successfully!");
      setFormData({ title: "", submission_date: "" });
      setFile(null);
    } else {
      alert(result.message || "Failed to submit assignment.");
    }
  }    
  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="pt-5">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-center px-4 py-10">
        <form
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Add Assignment</h2>

          <label className="font-semibold mb-1 block">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter title"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="font-semibold mb-1 block">Upload File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2.5 mb-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <label className="font-semibold mb-1 block">Submission Date</label>
          <input
            type="date"
            name="submission_date"
            value={formData.submission_date}
            onChange={handleChange}
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-3 rounded-lg font-bold hover:bg-blue-800 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addassignment;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import backbutton from '../college_website/backbutton.png'

const AddCourse = () => {
  const [coursename, setCoursename] = useState('');
  const [coursecode, setCoursecode] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [durationyears, setDurationyears] = useState('');
  const [isActive, setIsActive] = useState(true);

  const [batches, setBatches] = useState([
    { batchname: '', startyear: '', endyear: '', isActive: true }
  ]);

  const navigate = useNavigate();

  const handleBatchChange = (index, field, value) => {
    const updated = [...batches];
    updated[index][field] = field === 'isActive' ? value.target.checked : value.target.value;
    setBatches(updated);
  };

  const addBatchField = () => {
    setBatches([...batches, { batchname: '', startyear: '', endyear: '', isActive: true }]);
  };

  const submitForm = async (e) => {
    e.preventDefault();

    const newCourse = {
      coursename,
      coursecode,
      department,
      durationyears,
      isActive,
      batches,
    };

    try {
      const res = await fetch('http://localhost:3000/api/admin/addCourse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(newCourse),
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        navigate('/coursedetails');
      } else {
        const text = await res.text();
        console.error('Server error:', text);
        alert('Course already exists.You may update instead');
      }
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Server error');
    }
  };

  return (
    <section className="bg-white mb-20">
      <div className="w-full px-4 md:px-12 py-2">
        <div className="bg-purple-100 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form onSubmit={submitForm}>
            
            <h2 className="text-3xl text-purple-800 text-center font-semibold mb-6">
              Add Course with Batches
            </h2>

            {/* Row 1: Course Name & Course Code */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-bold mb-1">Course Name</label>
                <input
                  type="text"
                  placeholder='Enter Course Name'
                  required
                  className="border w-full py-2 px-3"
                  value={coursename}
                  onChange={(e) => setCoursename(e.target.value)}
                />
              </div>
              <div>
                <label className="block font-bold mb-1">Course Code</label>
                <input
                  type="text"
                  placeholder='BLC101'
                  required
                  className="border w-full py-2 px-3"
                  value={coursecode}
                  onChange={(e) => setCoursecode(e.target.value)}
                />
              </div>
            </div>

            {/* Row 2: Department & Duration */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block font-bold mb-1">Department</label>
                <select
                  className="border w-full py-2 px-3"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="ComputerScience">Computer Science</option>
                  <option value="InformationTechnology">Information Technology</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Mechanical">Mechanical</option>
                  <option value="Civil">Civil</option>
                  <option value="NaturalandPhysical">Natural and Physical Sciences</option>
                  <option value="SocialSciences">Social Sciences</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Business">Business and Management</option>
                  <option value="Education">Education</option>
                  <option value="Law">Law</option>
                  <option value="Medicine">Medicine and Health Sciences</option>
                  <option value="Agriculture">Agricultural Sciences</option>
                  <option value="Architecture">Architecture and Design</option>
                  <option value="Art">Arts and Fine Arts</option>
                  <option value="Environmental">Environmental Studies</option>
                  <option value="Other">Other</option> 
                </select>
              </div>
              <div>
                <label className="block font-bold mb-1">Duration (Years)</label>
                <input
                  type="number"
                  required
                  className="border w-full py-2 px-3"
                  value={durationyears}
                  onChange={(e) => setDurationyears(e.target.value)}
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block font-bold mb-1">Course Active?</label>
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />{' '}
              {isActive ? 'Yes' : 'No'}
            </div>

            {/* Batches Section */}
            <h3 className="text-xl font-bold mb-2 mt-6 text-purple-700">Batch Details</h3>
            {batches.map((batch, index) => (
              <div key={index} className="bg-white border p-4 mb-4 rounded shadow-sm">
                <div className="mb-2">
                  <label className="block font-bold mb-1">Batch Name</label>
                  <input
                    type="text"
                    required
                    className="border w-full py-2 px-3"
                    value={batch.batchname}
                    onChange={(e) => handleBatchChange(index, 'batchname', e)}
                  />
                </div>

                <div className="mb-2">
                  <label className="block font-bold mb-1">Start Year</label>
                  <input
                    type="number"
                    required
                    className="border w-full py-2 px-3"
                    value={batch.startyear}
                    onChange={(e) => handleBatchChange(index, 'startyear', e)}
                  />
                </div>

                <div className="mb-2">
                  <label className="block font-bold mb-1">End Year</label>
                  <input
                    type="number"
                    required
                    className="border w-full py-2 px-3"
                    value={batch.endyear}
                    onChange={(e) => handleBatchChange(index, 'endyear', e)}
                  />
                </div>

                <div className="mb-2">
                  <label className="block font-bold mb-1">Batch Active?</label>
                  <input
                    type="checkbox"
                    checked={batch.isActive}
                    onChange={(e) => handleBatchChange(index, 'isActive', e)}
                  />{' '}
                  {batch.isActive ? 'Yes' : 'No'}
                </div>
              </div>
            ))}

            <div className="mb-6 text-center">
              <button
                type="button"
                onClick={addBatchField}
                className="text-sm text-purple-600 hover:underline"
              >
                + Add Another Batch
              </button>
            </div>

            <button
              type="submit"
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Add Course with Batches
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddCourse;

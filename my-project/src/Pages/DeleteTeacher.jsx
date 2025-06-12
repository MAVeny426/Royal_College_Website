import React, { useEffect, useState } from 'react';

const DeleteTeacher = () => {
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/api/admin/getTeacherNames', {
      credentials: 'include', // send cookies/session
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched teachers:', data);
        if (data.teachers && Array.isArray(data.teachers)) {
          setTeachers(
            data.teachers.map(t => ({
              _id: t.user_id,
              Name: t.name,
            }))
          );
        } else {
          setTeachers([]);
        }
      })
      .catch(err => {
        console.error('Error fetching teachers:', err);
        setTeachers([]);
      });
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete teacher: ${name}?`)) {
      try {
        const res = await fetch('http://localhost:3000/api/admin/deleteTeacher', {
          method: 'DELETE',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name }),
        });

        if (res.ok) {
          setTeachers(prev => prev.filter(teacher => teacher._id !== id));
          alert(`Teacher '${name}' deleted successfully.`);
        } else {
          const errorData = await res.json();
          alert(`Failed to delete teacher: ${errorData.message || res.statusText}`);
          console.error('Failed to delete teacher:', errorData);
        }
      } catch (error) {
        console.error('Error deleting teacher:', error);
        alert('Error deleting teacher. See console for details.');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-red-600">Delete Teacher</h1>

      {teachers.length === 0 ? (
        <p className="text-center text-gray-500">No teachers found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-red-100 text-red-800">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map(teacher => (
                <tr key={teacher._id} className="border-t">
                  <td className="py-2 px-4">{teacher.Name}</td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => handleDelete(teacher._id, teacher.Name)}
                      className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DeleteTeacher;

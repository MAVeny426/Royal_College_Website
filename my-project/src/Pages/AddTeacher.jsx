import React, { useState, useEffect } from 'react';
import teacherImg from '../college_website/addteacher.jpeg';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';

const AddTeacher = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    course: '',
    role: 'teacher',
    year: '',
    batch: '',
    qualification: '',
    department: '',
    experience_years: '',
    subjects_taught: '',
    schedule: '',
  });

  const [courses, setCourses] = useState([]);
  const [batches, setBatches] = useState([]);
  const [error, setError] = useState('');
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Auth check
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/auth/verifyToken', {
          method: 'GET',
          credentials: 'include',
        });

        if (!res.ok) {
          navigate('/login');
          return;
        }

        const data = await res.json();
        setUserRole(data.userRole);
      } catch (err) {
        console.error('Auth check failed:', err);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  // Fetch all courses
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/admin/getcoursenames', {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch courses');

        const data = await res.json();
        setCourses(data.courses || []);
      } catch (err) {
        console.error('Error fetching courses:', err);
      }
    };

    fetchCourses();
  }, []);

  // Fetch batches when course changes
  useEffect(() => {
    const fetchBatchesByCourse = async () => {
      if (!formData.course) {
        setBatches([]);
        return;
      }

      try {
        const res = await fetch(`http://localhost:3000/api/admin/getBatchesByCourse?courseName=${encodeURIComponent(formData.course)}`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch batches');

        const data = await res.json();
        setBatches(data.batches || []);
      } catch (err) {
        console.error('Error fetching batches:', err);
        setBatches([]);
      }
    };

    fetchBatchesByCourse();
  }, [formData.course]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const payload = {
      ...formData,
      subjects_taught: formData.subjects_taught.split(',').map((s) => s.trim()),
      schedule: formData.schedule.split(',').map((s) => s.trim()),
    };

    try {
      const response = await fetch('http://localhost:3000/api/teach/addteacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      const contentType = response.headers.get('content-type');
      let data;

      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
        console.log(data);
        
      } else {
        const text = await response.text();
        if (response.ok) {
          alert(text);
          navigate('/Dashboard');
          return;
        } else {
          throw new Error(text);
        }
      }

      if (response.ok) {
        alert(data.message);
        navigate('/Dashboard');
      } else {
        setError(data.message || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.message || 'Failed to submit.');
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  if (userRole !== 'admin') {
    return (
      <>
        <Navbar />
        <div className="text-center mt-20 text-2xl text-red-600">Access Denied: Admins only</div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="flex flex-col md:flex-row items-center max-w-5xl w-full shadow-lg rounded-lg overflow-hidden">
          <div className="md:w-1/2 w-full">
            <img src={teacherImg} alt="Teacher" className="w-full h-full object-cover" />
          </div>

          <div className="md:w-1/2 w-full p-8 bg-white">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h2 className="text-2xl font-bold text-center underline">Teacher Registration</h2>

              {error && <p className="text-red-500 text-center">{error}</p>}

              <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />

              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required />

              <select name="course" value={formData.course} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" required>
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.course_id} value={course.course_name}>
                    {course.course_name}
                  </option>
                ))}
              </select>

              <select name="role" value={formData.role} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>

              <input type="text" name="year" placeholder="Year" value={formData.year} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />

              <select name="batch" value={formData.batch} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
                <option value="">Select Batch</option>
                {batches.map((batch) => (
                  <option key={batch.batch_id} value={batch.batch_name}>
                    {batch.batch_name} ({batch.year})
                  </option>
                ))}
              </select>

              <input type="text" name="qualification" placeholder="Qualification" value={formData.qualification} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />

              <select name="department" id="" value={formData.department} onChange={handleChange} className="w-full px-4 py-2 border rounded-md">
                <option value="">Select Department</option>
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
              <input type="number" name="experience_years" placeholder="Years of Experience" value={formData.experience_years} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />

              <input type="text" name="subjects_taught" placeholder="Subjects Taught (comma-separated)" value={formData.subjects_taught} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />

              <input type="text" name="schedule" placeholder="Schedule (comma-separated)" value={formData.schedule} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />

              <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
                Register Teacher
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTeacher;

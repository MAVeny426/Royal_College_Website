import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [Name, SetUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [guardian, setGuardian] = useState('');
  const [address, setAddress] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState('');
  const [blood, setBlood] = useState('');

  const navigate = useNavigate();

  const signupSubmit = async (userDetails) => {
    const res = await fetch('http://localhost:3000/api/auth/studentsignup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userDetails),
    });

    if (res.status === 201) {
      localStorage.setItem('userRole', 'student');
      alert('Signup Successful');
      navigate('/Login');
    } else if (res.status === 409) {
      alert('Email already exists. Please login or use another email.');
    } else {
      alert('Please check the input data');
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    const userDetails = {
      name: Name,
      email,
      password,
      course,
      guardian_name: guardian,
      address,
      dob,
      gender,
      blood_group: blood,
    };
    signupSubmit(userDetails);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-500 to-indigo-500">
      <div className="w-full max-w-4xl h-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-700 to-blue-500 text-white flex flex-col justify-center items-center p-10">
          <h2 className="text-4xl font-bold">ROYAL COLLEGE</h2>
        </div>

        <form onSubmit={submitForm} className="w-full md:w-1/2 p-8 flex flex-col justify-center space-y-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-6">SignUp</h3>

          <input type="text" placeholder="Name" value={Name} onChange={(e) => SetUserName(e.target.value)} className="input" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
          <input type="text" placeholder="Course" value={course} onChange={(e) => setCourse(e.target.value)} className="input" />
          <input type="text" placeholder="Guardian Name" value={guardian} onChange={(e) => setGuardian(e.target.value)} className="input" />
          <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="input" />
          <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} className="input" />
          <select value={gender} onChange={(e) => setGender(e.target.value)} className="input">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="text" placeholder="Blood Group (e.g., A+)" value={blood} onChange={(e) => setBlood(e.target.value)} className="input" />

          <button type="submit" className="w-full py-3 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition duration-300">
            SignUp
          </button>

          <div className="flex justify-center items-center gap-2 mt-4 text-sm text-gray-600">
            <p>Already have an account?</p>
            <a href="/login" className="text-blue-500 font-semibold hover:underline">Login</a>
          </div>
        </form>
      </div>
    </div>
  );
};

// TailwindCSS utility class reuse
const inputClass = "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400";
SignUp.defaultProps = {
  className: inputClass,
};

export default SignUp;

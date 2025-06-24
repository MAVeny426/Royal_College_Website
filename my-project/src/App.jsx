import React from 'react';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import Attendance from './Pages/Attendance.jsx';
import SignUp from './Pages/SignUp.jsx';
import Login from './Pages/Login.jsx';
import Applyleave from './Pages/Applyleave.jsx';
import Studentattendance from './Pages/Studentattendance.jsx';
import Account from './Pages/Account.jsx';
import Addassignment from './Pages/Addassignment.jsx';
import Dashboard from "./Pages/Dashboard.jsx";
import ViewTeachers from './Pages/ViewTeachers.jsx';
import AddTeacher from './Pages/AddTeacher.jsx';
import UpdateTeacher from './Pages/UpdateTeacher.jsx';
import DeleteTeacher from './Pages/DeleteTeacher.jsx';
import AddCourse from './Pages/AddCourse.jsx';
import Coursedetails from './Pages/Coursedetails.jsx';
import UpdateCourse from './Pages/Updatecourse.jsx';
import EditCourseDetails from './Pages/EditCourseDetails.jsx';
import DeleteCourse from './Pages/DeleteCourse.jsx';
import AllCourses from './Pages/AllCourses.jsx';
import AddBatch from './Pages/AddBatch.jsx';
import ViewCourse from './Pages/ViewCourse.jsx';
import EditBatch from './Pages/EditBatch.jsx';
import ClassTeacher from './Pages/ClassTeacher.jsx';

// import NotFound from './pages/NotFound';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Home />} />
        <Route path="/Attendance" element={<Attendance />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Applyleave" element={<Applyleave />} />
        <Route path="/Studentattendance" element={<Studentattendance />} />
        <Route path='/Account' element={<Account />} />
        <Route path='/Assignment' element={<Addassignment/>}/>
        <Route path='/Dashboard' element={<Dashboard />}/>
        <Route path='/AddTeacher' element={< AddTeacher/>}/>
        <Route path='/UpdateTeacher' element={< UpdateTeacher/>}/>
        <Route path='/DeleteTeacher' element={< DeleteTeacher/>}/>
        <Route path='/teachersdetails' element={< ViewTeachers/>}/>
        <Route path='/AddCourse' element={< AddCourse/>}/>
        <Route path='/Coursedetails' element={< Coursedetails/>}/>
        <Route path='/UpdateCourse' element={< UpdateCourse/>}/>
        <Route path='/EditCourseDetails/:id' element={< EditCourseDetails/>}/>
        <Route path='/DeleteCourse' element={< DeleteCourse/>}/>
        <Route path='/AllCourses' element={< AllCourses/>}/>
        <Route path='/AddBatch' element={< AddBatch/>}/>
        <Route path="/ViewCourse" element={<ViewCourse />} />
        <Route path="/EditBatch" element={<EditBatch />} />
        <Route path="/ClassTeacher" element={<ClassTeacher />} />
        {/* Not-Found Route */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;

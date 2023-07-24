import './App.css';
import { Routes, Route } from "react-router-dom"

import Header from './Components/Header';
import Home from './Pages/Home';
import Register from './Pages/Register';
import Login from './Pages/Login';
import News from './Pages/News';
import New from './Pages/New';
import Degrees from './Pages/Degrees';
import Degree from './Pages/Degree';
import Jobs from './Pages/Jobs';
import Job from './Pages/Job';
import AboutUs from './Pages/AboutUs';
import Profile from './Pages/Profile';
import StudentEditProfile from './Pages/StudentEditProfile';
import SchoolAddDegree from './Pages/SchoolAddDegree';
import SchoolEditDegree from './Pages/SchoolEditDegree';
import SchoolEditProfile from './Pages/SchoolEditProfile';
import RecruiterAddJob from './Pages/RecruiterAddJob';
import RecruiterEditJob from './Pages/RecruiterEditJob';
import RecruiterEditProfile from './Pages/RecruiterEditProfile';
import UserEditProfile from './Pages/UserEditProfile';
import Admin from './Pages/Admin';
import AdminAddDegree from './Pages/AdminAddDegree';
import AdminAddJob from './Pages/AdminAddJob';
import AdminAddNew from './Pages/AdminAddNew';
import AdminEditDegree from './Pages/AdminEditDegree';
import AdminEditJob from './Pages/AdminEditJob';
import AdminEditNew from './Pages/AdminEditNew';
import AdminEditUser from './Pages/AdminEditUser';
import AdminEditStudent from './Pages/AdminEditStudent';
import AdminEditSchool from './Pages/AdminEditSchool';
import AdminEditRecruiter from './Pages/AdminEditRecruiter';
import Error from './Pages/Error';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<New />} />
        <Route path="/degrees" element={<Degrees />} />
        <Route path="/degrees/:id" element={<Degree />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:id" element={<Job />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/add-degree" element={<SchoolAddDegree />} />
        <Route path="/profile/edit-degree/:id" element={<SchoolEditDegree />} />
        <Route path="/profile/add-job" element={<RecruiterAddJob />} />
        <Route path="/profile/edit-job/:id" element={<RecruiterEditJob />} />
        <Route path="/profile/edit-student" element={<StudentEditProfile />} />
        <Route path="/profile/edit-school" element={<SchoolEditProfile />} />
        <Route path="/profile/edit-recruiter" element={<RecruiterEditProfile />} />
        <Route path="/admin/edit-user" element={<UserEditProfile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/add-degree" element={<AdminAddDegree />} />
        <Route path="/admin/add-job" element={<AdminAddJob />} />
        <Route path="/admin/add-new" element={<AdminAddNew />} />
        <Route path="/admin/edit-degree/:id" element={<AdminEditDegree />} />
        <Route path="/admin/edit-job/:id" element={<AdminEditJob />} />
        <Route path="/admin/edit-new/:id" element={<AdminEditNew />} />
        <Route path="/admin/edit-user/:id" element={<AdminEditUser />} />
        <Route path="/admin/edit-student/:id" element={<AdminEditStudent />} />
        <Route path="/admin/edit-school/:id" element={<AdminEditSchool />} />
        <Route path="/admin/edit-recruiter/:id" element={<AdminEditRecruiter />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
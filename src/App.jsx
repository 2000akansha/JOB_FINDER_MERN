import "./App.css"; // Assuming your stylesheet is named App.css

import React, { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"; // Ensure Navigate is imported
import { Context } from "./main";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Layout/Footer";
import EmployerHome from "./components/Home/EmployerHome";
import JobseekerHome from "./components/Home/JobseekerHome";
import Jobs from "./components/Job/Jobs";
import JobDetails from "./components/Job/JobDetails";
import Application from "./components/Application/Application";
import MyApplications from "./components/Application/MyApplications";
import PostJob from "./components/Job/PostJob";
import NotFound from "./components/NotFound/NotFound";
import MyJobs from "./components/Job/MyJobs";
import LoginEmployer from "./components/Auth/LoginEmployer";
import LoginJobSeeker from "./components/Auth/LoginJobSeeker";
import RegisterEmployer from "./components/Auth/RegisterEmployer";
import RegisterJobSeeker from "./components/Auth/RegisterJobSeeker";
import EmployerApplications from "./components/Application/EmpApp";

const App = () => {
  const { isAuthorized } = useContext(Context);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/register1" />} />
          <Route path="/login1" element={<LoginEmployer />} />
          <Route path="/login2" element={<LoginJobSeeker />} />
          <Route path="/register1" element={<RegisterEmployer />} />
          <Route path="/register2" element={<RegisterJobSeeker />} />
          <Route path="/EmpHome" element={isAuthorized ? <EmployerHome /> : <Navigate to="/login1" />} />
          <Route path="/JobseekerHome" element={isAuthorized ? <JobseekerHome /> : <Navigate to="/login2" />} />
          <Route path="/job/getall" element={<Jobs />} />
          <Route path="/job/:id" element={<JobDetails />} />
          <Route path="/application/:id" element={<Application />} />
          <Route path="/applications/me" element={<MyApplications />} />
          <Route path="/applications/employer" element={<EmployerApplications />} />
          <Route path="/job/post" element={<PostJob />} />
          <Route path="/job/me" element={<MyJobs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;

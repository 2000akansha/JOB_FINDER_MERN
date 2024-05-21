import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Context } from "../../main";
import JobseekerNavbar from "../Layout/JobseekerNavbar"; // Import the correct navbar component
import Footer from "../Layout/Footer";
import HeroSection from "./HeroSection";
import HowItWorks from "./HowItWorks";
import PopularCategories from "./PopularCategories";
import PopularCompanies from "./PopularCompanies";

const JobseekerHome = () => {
  const { isAuthorized } = useContext(Context);
  if (!isAuthorized) {
    return <Navigate to={"/login2"} />;
  }
  return (
    <>
      <JobseekerNavbar /> {/* Use the correct navbar component */}
      <section className="homePage page">
        <HeroSection />
        <HowItWorks />
        <PopularCategories />
        <PopularCompanies />
      </section>
      <Footer />
    </>
  );
};

export default JobseekerHome;

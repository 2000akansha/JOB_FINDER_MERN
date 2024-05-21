import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from '../../main'; // Import the Context from AppWrapper
import role from "../Auth/LoginJobSeeker"

const JobDetails = () => {
  const { id } = useParams();
  console.log("ID from URL:", id);
  
  const [job, setJob] = useState({});
  const navigateTo = useNavigate();
  
  // Access context values
  const { isAuthorized, token } = useContext(Context);
  console.log(token);
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!token) {
        console.log("No token found, redirecting to login page.");
        navigateTo("/login2");
        return;
      }
    
      console.log("Token found, fetching details");
      try {
        const requestOptions = {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            "Content-Type": "application/json", // Set Content-Type header
          },
          withCredentials: true,
        };
    
        const response = await axios.get(`http://127.0.0.1:4000/api/v1/job/${id}`, requestOptions);
    
        if (response.status !== 200) {
          console.log(`Fetch job details with status: ${response.status}`);
          if (response.status === 401) {
            navigateTo("/login2");
          } else {
            navigateTo("/notfound");
          }
          return;
        }
    
        const { data } = response;
        console.log("Fetched Job Data:", data);
        setJob(data.job);
      } catch (error) {
        console.error("Error fetching job details:", error);
        if (error.response && error.response.status === 401) {
          // Handle unauthorized access
          navigateTo("/login2");
          console.log(error.response); // Redirect to login page
        } else {
          // Handle other errors (e.g., display a generic error message)
          navigateTo("/notfound"); // Redirect to not found page
        }
      }
    };
    fetchJobDetails();
  }, [id, navigateTo, isAuthorized, token]);

  return (
    <section className="jobDetail page">
      <div className="container">
        <h3>Job Details</h3>
        <div className="banner">
          <p>
            Title: <span> {job.title}</span>
          </p>
          <p>
            Category: <span>{job.category}</span>
          </p>
          <p>
            Country: <span>{job.country}</span>
          </p>
          <p>
            City: <span>{job.city}</span>
          </p>
          <p>
            Location: <span>{job.location}</span>
          </p>
          <p>
            Description: <span>{job.description}</span>
          </p>
          <p>
            Job Posted On: <span>{job.jobPostedOn}</span>
          </p>
          <p>
            Salary:{" "}
            {job.fixedSalary ? (
              <span>{job.fixedSalary}</span>
            ) : (
              <span>
                {job.salaryFrom} - {job.salaryTo}
              </span>
            )}
            </p>
          {/* Adjusted brackets */}
          {isAuthorized && role === "Job Seeker" && (
            // Only show the link if the user is authorized and is a job seeker
            <Link to={`/application/${job._id}`}>Apply Now</Link>
          )}
          {isAuthorized && role !== "Job Seeker" && (
            // Only show the link if the user is authorized and is not a job seeker
            <Link to={'/EmpHome'}>Return To Home</Link>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobDetails;

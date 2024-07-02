import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Context } from "../../main";

const PostJob = () => {
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  // Logging context values and navigation status
  useEffect(() => {
    console.log("Authorization status:", isAuthorized);
    console.log("User from context:", user);
    if (!isAuthorized ) {
      console.log("Redirecting to /login1");
      navigateTo("/login1");
    }
  }, [isAuthorized, navigateTo, user]);

  // State variables
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [salaryFrom, setSalaryFrom] = useState("");
  const [salaryTo, setSalaryTo] = useState("");
  const [fixedSalary, setFixedSalary] = useState("");
  const [salaryType, setSalaryType] = useState("default");

  // Function to handle job post
  const handleJobPost = async (e) => {
    e.preventDefault();

    // Log form data before sending
    console.log("Posting job with data:", {
      title,
      description,
      category,
      country,
      city,
      location,
      salaryFrom,
      salaryTo,
      fixedSalary,
      salaryType
    });

    if (salaryType === "Fixed Salary") {
      setSalaryFrom("");
      setSalaryTo("");
    } else if (salaryType === "Ranged Salary") {
      setFixedSalary("");
    } else {
      setSalaryFrom("");
      setSalaryTo("");
      setFixedSalary("");
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:4000/api/v1/job/post",
        salaryType === "Fixed Salary"
          ? { title, description, category, country, city, location, fixedSalary }
          : { title, description, category, country, city, location, salaryFrom, salaryTo },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Log the response data
      console.log("Job posted successfully:", response.data);
      
      toast.success(response.data.message);
      navigateTo("/EmpHome");
    } catch (error) {
      // Log the error response and message
      console.error("Error posting job:", error);
      toast.error(error.response?.data?.message || "An error occurred while posting the job.");
    }
  };

  return (
    <div className="job_post page">
      <div className="container">
        <h3>POST NEW JOB</h3>
        <form onSubmit={handleJobPost}>
          {/* Job post form inputs */}
          <div>
            <label>Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div>
            <label>Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
          </div>
          <div>
            <label>Category</label>
            <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div>
            <label>Country</label>
            <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} required />
          </div>
          <div>
            <label>City</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
          </div>
          <div>
            <label>Location</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <div>
            <label>Salary Type</label>
            <select value={salaryType} onChange={(e) => setSalaryType(e.target.value)} required>
              <option value="default">Select Salary Type</option>
              <option value="Fixed Salary">Fixed Salary</option>
              <option value="Ranged Salary">Ranged Salary</option>
            </select>
          </div>
          {salaryType === "Ranged Salary" && (
            <>
              <div>
                <label>Salary From</label>
                <input type="number" value={salaryFrom} onChange={(e) => setSalaryFrom(e.target.value)} required />
              </div>
              <div>
                <label>Salary To</label>
                <input type="number" value={salaryTo} onChange={(e) => setSalaryTo(e.target.value)} required />
              </div>
            </>
          )}
          {salaryType === "Fixed Salary" && (
            <div>
              <label>Fixed Salary</label>
              <input type="number" value={fixedSalary} onChange={(e) => setFixedSalary(e.target.value)} required />
            </div>
          )}
          <button type="submit">Post Job</button>
          
        </form>
      </div>
    </div>
  );
};

export default PostJob;

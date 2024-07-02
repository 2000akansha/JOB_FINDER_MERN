import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModel";

const JobSeekerApplication = () => {
   const { user, isAuthorized } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!user || !isAuthorized) {
        navigateTo("/login2");
        return;
      }

      try {
        const url = "http://127.0.0.1:4000/api/v1/application/jobseeker/getall";
        
        console.log("Fetching data from URL:", url); // Log the URL being fetched

        const response = await fetch(url, {
          method: "GET",
          credentials: "include", // This option sends cookies along with the request
        });

        console.log("Response status:", response.status); // Log the response status

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("Fetched data:", data); // Log the fetched data
        setApplications(data.applications);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [isAuthorized, user, navigateTo]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/");
    }
  }, [isAuthorized, navigateTo]);

  const deleteApplication = async (id) => {
    try {
      const url = `http://127.0.0.1:4000/api/v1/application/delete/${id}`;
      const response = await fetch(url, {
        method: "DELETE",
        credentials: "include", // This option sends cookies along with the request
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      toast.success(data.message);
      setApplications((prevApplications) =>
        prevApplications.filter((application) => application._id !== id)
      );
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Error deleting application. Please try again later.");
    }
  };
};

export default JobSeekerApplication ;

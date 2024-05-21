import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModel";

const MyApplications = () => {
  const { user } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const { isAuthorized } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = user && user.role === "Employer"
          ?  "http://127.0.0.1:4000/api/v1/application/employer/getall"
          : "http://127.0.0.1:4000/api/v1/application/jobseeker/getall";
        const response = await fetch(url, {
          method: "GET",
          credentials: "include", // This option sends cookies along with the request
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setApplications(data.applications);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data. Please try again later.");
      }
    };

    fetchData();
  }, [isAuthorized, user]);

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

  const openModal = (imageUrl) => {
    setResumeImageUrl(imageUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      <div className="container">
        <h1>
          {user && user.role === "Employer"
            ? "Applications From Job Seekers"
            : "My Applications"}
        </h1>
        {applications.length === 0 ? (
          <h4>No applications found</h4>
        ) : (
          applications.map((application) => (
            <ApplicationCard
              key={application._id}
              application={application}
              deleteApplication={deleteApplication}
              openModal={openModal}
            />
          ))
        )}
      </div>
      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
};

const ApplicationCard = ({ application, deleteApplication, openModal }) => {
  return (
    <div className="application_card">
      <div className="detail">
        <p>
          <span>Name:</span> {application.name}
        </p>
        <p>
          <span>Email:</span> {application.email}
        </p>
        <p>
          <span>Phone:</span> {application.phone}
        </p>
        <p>
          <span>Address:</span> {application.address}
        </p>
        <p>
          <span>CoverLetter:</span> {application.coverLetter}
        </p>
      </div>
      <div className="resume">
        <img
          src={application.resume.url}
          alt="resume"
          onClick={() => openModal(application.resume.url)}
        />
      </div>
      <div className="btn_area">
        <button onClick={() => deleteApplication(application._id)}>
          Delete Application
        </button>
      </div>
    </div>
  );
};

export default MyApplications;

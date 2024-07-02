import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModel";

const EmployerApplications = () => {
  const { user, isAuthorized, role } = useContext(Context);
  const [applications, setApplications] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [resumeImageUrl, setResumeImageUrl] = useState("");
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = "http://127.0.0.1:4000/api/v1/application/employer/getall";

        const response = await fetch(url, {
          method: "GET",
          credentials: "include",
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
  }, [isAuthorized, user, role]);

  useEffect(() => {
    if (!isAuthorized) {
      navigateTo("/login1");
    }
  }, [isAuthorized, navigateTo]);

  const openModal = (resumeUrl) => {
    setResumeImageUrl(resumeUrl);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <section className="my_applications page">
      <div className="container">
        <h1>Applications From Job Seekers</h1>
        {applications.length === 0 ? (
          <h4>No applications found</h4>
        ) : (
          applications.map((application) => (
            <ApplicationCard
              key={application._id}
              application={application}
              openModal={openModal}
            />
          ))
        )}
      </div>
      {modalOpen && <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />}
    </section>
  );
};

const ApplicationCard = ({ application, openModal }) => {
  return (
    <div className="application_card">
      <div className="detail">
        <p><span>Name:</span> {application.name}</p>
        <p><span>Email:</span> {application.email}</p>
        <p><span>Phone:</span> {application.phone}</p>
        <p><span>Address:</span> {application.address}</p>
        <p><span>Cover Letter:</span> {application.coverLetter}</p>
      </div>
      <div className="resume">
        <img
          src={application.resume.url}
          alt="resume"
          onClick={() => openModal(application.resume.url)}
        />
      </div>
    </div>
  );
};

export default EmployerApplications;

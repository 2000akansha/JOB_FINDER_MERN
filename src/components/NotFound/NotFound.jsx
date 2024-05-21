import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <>
      <section className="page notfound">
        <div className="content">
          <img src="/404-error.jpg" alt="not found" />
          <h2>
            <button onClick={() => navigate("/JobseekerHome")}>
              RETURN TO HOME PAGE
            </button>
          </h2>
        </div>
      </section>
    </>
  );
};

export default NotFound;

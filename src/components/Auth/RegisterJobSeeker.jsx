import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { RiLock2Fill } from "react-icons/ri";
import { FaPencilAlt } from "react-icons/fa";
import { FaPhoneFlip } from "react-icons/fa6";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Context } from "../../main";
import { sendSignInLinkToEmail, checkIfEmailExists } from "../../authService"; // Import correctly

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [workStatus, setworkStatus] = useState("");

  const { isAuthorized, setIsAuthorized, user, setUser } = useContext(Context);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Check if the email already exists
      const emailExists = await checkIfEmailExists(email);
      if (emailExists) {
        toast.error("This email already exists. Please use a different email address.");
        return;
      }
      const { data } = await axios.post(
        "http://127.0.0.1:4000/api/v1/user2/register2",
        { name, phone, email, role, workStatus, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      
      // Send verification link to email
      await sendSignInLinkToEmail(email);
      toast.success(data.message);
      toast.success("An email has been sent to your email address. Please click on the link to verify.");


      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setRole("");
      setworkStatus("");
      setIsAuthorized(false);
    } catch (error) {
      if (error.response?.data?.message === "Email Invalid") {
        toast.error("Email Invalid.");
      } else {
        toast.error(error.response?.data?.message || "An error occurred during registration.");
      }
      console.error('Registration error:', error);
    }
  };

  if (isAuthorized) {
    return <Navigate to={'/JobseekerHome'} />
  }


  return (
    <>
      <section className="authPage">
        <div className="container">
          <div className="header">
            {/* <img src="/person-seeing-through-magnifying-glass.png"  alt="logo" /> */}
            <h3>Create a new account</h3>
          </div>
          <form>
            <div className="inputTag">
              <label>Register As</label>
              <div>
                <select value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">Select Role</option>
                  <option value="Employer">Employer</option>
                  <option value="Job Seeker">Job Seeker</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Name</label>
              <div>
                <input
                  type="text"
                  placeholder="abc"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FaPencilAlt />
              </div>
            </div>
            <div className="inputTag">
              <label>Email Address</label>
              <div>
                <input
                  type="email"
                  placeholder="xyz@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MdOutlineMailOutline />
              </div>
            </div>
            <div className="inputTag">
              <label>Phone Number</label>
              <div>
                <input
                  type="tel"
                  placeholder="12345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <FaPhoneFlip />
              </div>
            </div>
            <div className="inputTag">
              <label className="ws">Work Status</label>
              <div>
                <select value={workStatus} onChange={(e) => setworkStatus(e.target.value)}>
                  <option value="">Select Work Status</option>
                  <option value="experienced">Experienced</option>
                  <option value="fresher">Fresher</option>
                </select>
                <FaRegUser />
              </div>
            </div>
            <div className="inputTag">
              <label>Password</label>
              <div>
                <input
                  type="password"
                  placeholder="Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <RiLock2Fill />
              </div>
            </div>
            <button type="submit" onClick={handleRegister}>
              Register
            </button>
            <Link to={"/login2"}>Login Now</Link>
          </form>
        </div>
        <div className="banner">
          <img src="/register.png"  alt="login" />
        </div>
      </section>
    </>
  );
};

export default Register;


import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../main"; // Assuming the context is defined in a file named "main.js"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { GiHamburgerMenu } from "react-icons/gi";

const JobseekerNavbar = () => {
    const [show, setShow] = useState(false);
    const { isAuthorized, setIsAuthorized, user } = useContext(Context);
    const navigateTo = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await axios.get(
                "http://127.0.0.1:4000/api/v1/user2/logout2",
                // Replace with your actual logout API endpoint URL
                // Update with your logout API endpoint
                {
                    withCredentials: true,
                }
            );
            toast.success(response.data.message);
            setIsAuthorized(false);
            navigateTo("/login2");
        } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthorized(true); // Assuming you want to keep authorized state on error
        }
    };

    return (
        <nav className={isAuthorized ? "navbarShow" : "navbarHide"}>
            <div className="container">
                <div className="logo">
                    <img src="/Jobb.jpg" alt="logo" />
                </div>
                <ul className={!show ? "menu" : "show-menu"}>
                    <li>
                        <Link to={"/JobseekerHome"} onClick={() => setShow(false)}>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link to={"/job/getall"} onClick={() => setShow(false)}>
                            ALL JOBS
                        </Link>
                    </li>
                    <li>
                        <Link to={"/applications/me"} onClick={() => setShow(false)}>
                            MY APPLICATIONS
                        </Link>
                    </li>



                    <button onClick={handleLogout}>LOGOUT</button>
                </ul>
                <div className="hamburger">
                    <GiHamburgerMenu onClick={() => setShow(!show)} />
                </div>
            </div>
        </nav>
    );
};

export default JobseekerNavbar;

import React, { useContext } from "react";
import { Context }   from "../../main";
import { Link } from "react-router-dom";
import{FaLinkedin,FaGithub,FaTwitter} from 'react-icons/fa'
const Footer =()=>{
    const {isAuthorised}= useContext(Context);
    return(
        <footer className={isAuthorised ? "footerShow" :"footerHide"}>
<div>&copy;All Rights Reserved By Akansha Bhagat.
</div>
<Link to={'/https://www.linkedin.com/feed/'}target ="_blank"><FaLinkedin/></Link>
<Link to={'/https://github.com/'}target ="_blank"><FaGithub/></Link>
<Link to={'/https://twitter.com/notifications'}target ="_blank"><FaTwitter/></Link>

        </footer>
    )
}

export default Footer
import React,{Fragment} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileTop = ({profile:{
    user:{name,avatar},
  status,
  company,
  location,
  skills,
  social,
}}) => {
  return (
    <Fragment>
      <div className="profile-top bg-primary p-2">
              <img src={avatar} alt="" />
              <h1>{name}</h1>
              <p>
                {status} at {company}
              </p>
              <p>{location}</p>
              <div className="social">
                {social && social.website ? (
                  <Link to={social.website}>
                    <i className="fab fa-globe"></i>
                  </Link>
                ) : (
                  <Fragment></Fragment>
                )}
                {social && social.facebook ? (
                  <Link to={social.facebook}>
                    <i className="fab fa-facebook"></i>
                  </Link>
                ) : (
                  <Fragment></Fragment>
                )}
                {social && social.twitter ? (
                  <Link to={social.twitter}>
                    <i className="fab fa-twitter"></i>
                  </Link>
                ) : (
                  <Fragment></Fragment>
                )}
                {social && social.youtube ? (
                  <Link to={social.youtube}>
                    <i className="fab fa-youtube"></i>
                  </Link>
                ) : (
                  <Fragment></Fragment>
                )}
                {social && social.instagram ? (
                  <Link to={social.instagram}>
                    <i className="fab fa-instagram "></i>
                  </Link>
                ) : (
                  <Fragment></Fragment>
                )}
                {social && social.github ? (
                  <Link to={social.github}>
                    <i className="fab fa-github"></i>
                  </Link>
                ) : (
                  <Fragment></Fragment>
                )}
              </div>
            </div>
    </Fragment>
  );
};

ProfileTop.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileTop;

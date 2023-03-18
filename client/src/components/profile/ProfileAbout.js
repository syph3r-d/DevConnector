import React, { Fragment } from "react";
import PropTypes from "prop-types";

const ProfileAbout = ({profile:{user:{name},bio,skills}}) => {
  return (
    <Fragment>
      <div className="profile-about bg-light p-2">
        <div>
          <h2 className="text-primary">{`${name}'s bio`}</h2>
          <p>{bio}</p>
        </div>
        <div className="line"></div>
        <div>
          <h2 className="text-primary">Skill Set</h2>
        </div>
        <ul>
          {skills.map((skill, index) => (
            <li key={index} className="p-1 text-black">
              <i className="fa fa-check"></i>
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
};

ProfileAbout.propTypes = {
    profile:PropTypes.object.isRequired,
};

export default ProfileAbout;

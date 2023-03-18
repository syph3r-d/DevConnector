import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ProfileCard = ({profile:{ user: { _id,name, avatar }, skills,company, status, location} }) => {
  return (<div className="profile bg-light">
  <img
    className="round-img"
    src={avatar}
    alt=""
  />
  <div>
    <h2>{name}</h2>
    <p>{status} at {company}</p>
    <p>{location}</p>
    <Link to={`/profile/${_id}`} className="btn btn-primary mt-1">View profile</Link>
  </div>
  <ul>
    {skills.map((skill,index)=>(<li key={index} className="text-primary"><i className="fa fa-check"></i>{skill}</li>))}
  </ul>
</div>);
};

ProfileCard.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileCard;

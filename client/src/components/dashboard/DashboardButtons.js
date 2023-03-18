import React from "react";
import { Link } from "react-router-dom";

const DashboardButtons = () => {
  return (
    <div className="profile-edit">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary"></i> Edit Profile
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fa-solid fa-user-graduate text-primary"></i> Add Education
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fa-solid fa-briefcase text-primary"></i> Add Experience
      </Link>
    </div>
  );
};

export default DashboardButtons;

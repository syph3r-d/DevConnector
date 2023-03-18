import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfile } from "../../actions/profile";
import Spinner from "../layout/Spinner";
import { Link } from "react-router-dom";
import DashboardButtons from "./DashboardButtons";
import Experience from "./Experience";
import Education from "./Education";
import DeleteAccount from "./DeleteAccount";

const Dashboard = ({
  profile: { profile, loading },
  auth: { user },
  getProfile,
}) => {
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <div>
      <h1 className="large text-primary">Dashboard</h1>
      {loading || profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <p className="lead">
            <i className="fa fa-user"></i> Welcome {user && user.name}{" "}
          </p>
          <DashboardButtons />
          <Experience experiences={profile.experience} />
          <Education educations={profile.education} />
          <DeleteAccount />
        </Fragment>
      )}
      {!loading && profile === null ? (
        <Fragment>
          <p className="lead">
            <i className="fa fa-user"></i> Welcome {user && user.name}{" "}
          </p>
          <p>You have not created a profile yet</p>
          <Link to="/create-profile" className="btn btn-primary mt-1">
            Create Profile
          </Link>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStatetoProps, { getProfile })(Dashboard);

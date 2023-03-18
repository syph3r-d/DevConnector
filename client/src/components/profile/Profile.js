import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect, Fragment } from "react";
import { getProfileById } from "../../actions/profile";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExp from "./ProfileExp";
import ProfileEdu from "./ProfileEdu";
import { loadUser } from "../../actions/auth";

const Profile = ({ auth:{user,isAuthenticated,...rest}, getProfileById, profile_object: { profile, loading } }) => {
  let { id } = useParams();

  useEffect(() => {
    loadUser();
    getProfileById(id);
  }, [getProfileById,id]);

  return (
    <Fragment>
      {loading || profile === null ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/profiles" className="btn">
            Back to Profiles
          </Link>
          {!rest.loading && isAuthenticated && user._id===profile.user._id ? <Link to="/edit-profile" className="btn btn-primary">
            Edit Profile
          </Link> : <Fragment></Fragment>}

          <div className="profile-grid mt-1">
            <ProfileTop profile={profile}/>
            <ProfileAbout profile={profile}/>
            {profile.experience.length>0 ? <ProfileExp profile={profile}/> : <Fragment></Fragment>}
            {profile.education.length>0 ? <ProfileEdu profile={profile}/> :<Fragment></Fragment>}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
  getProfileById: PropTypes.func.isRequired,
};

const matchStatetoProps = (state) => ({
  auth: state.auth,
  profile_object: state.profile,
});

export default connect(matchStatetoProps, { getProfileById,loadUser })(Profile);

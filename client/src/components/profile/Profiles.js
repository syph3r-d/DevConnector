import React, { Fragment } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getProfiles, getProfileById } from "../../actions/profile";
import ProfileCard from "./ProfileCard";
import Spinner from "../layout/Spinner";

const Profiles = ({ profiles:{profiles,loading}, getProfiles, getProfileById }) => {
    useEffect(()=>{
        getProfiles();
    },[getProfiles])
  return <Fragment>
    <h1 className="large text-primary">Developers</h1>
      <p className="lead">
        <i className="fa fa-globe"></i> Browse and connect with developers
      </p>
      <div className="profiles">
      {loading && profiles.length === 0 ? <Spinner /> : <Fragment></Fragment>}
        {loading || profiles.length>0 ? profiles.map(profile=>(
            <ProfileCard key={profile._id} profile={profile}/>
        )) : <h4>No Profiles!</h4>}
      </div>
  </Fragment>;
};

Profiles.propTypes = {
  profiles: PropTypes.object.isRequired,
};

const mapStatetoProps=state=>({
    profiles:state.profile
})

export default connect(mapStatetoProps, { getProfiles, getProfileById })(
  Profiles
);

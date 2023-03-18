import React, { Fragment } from "react";
import { register } from "../../actions/profile";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getProfile } from "../../actions/profile";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'


const EditProfile = ({ register,profile:{profile,loading},getProfile }) => {
  const [formData, setFormData] = useState({
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    github: "",
    bio: "",
    twitter: "",
    facebook: "",
    youtube: "",
    linkedin: "",
    instagram: "",
  });


  useEffect(() => {

    if (profile !== null) {
      setFormData({
        status:loading ||!profile.status ? '' : profile.status,
        company:loading ||!profile.company ? '' : profile.company,
        website:loading ||!profile.website ? '' : profile.website,
        location:loading ||!profile.location ? '' : profile.location,
        skills:loading ||!profile.skills ? '' : profile.skills.join(','),
        github:loading ||!profile.github ? '' : profile.github,
        bio:loading ||!profile.bio ? '' : profile.bio,
        twitter:loading ||!profile.twitter ? '' : profile.twitter,
        facebook:loading ||!profile.facebook ? '' : profile.facebook,
        instagram:loading ||!profile.instagram ? '' : profile.instagram,
        linkedin:loading ||!profile.linkedin ? '' : profile.linkedin,
        youtube:loading ||!profile.youtube ? '' : profile.youtube,
      })
    }
    else{
        getProfile();
    }
  }, [profile,getProfile,loading]);

  const [socialLinks, toogleSocialLinks] = useState(false);

  const {
    status,
    company,
    website,
    location,
    skills,
    github,
    bio,
    twitter,
    facebook,
    youtube,
    linkedin,
    instagram,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    register(formData,true);

  };

  return (
    <Fragment>
      <h1 className="large text-primary">Create Your Profile</h1>
      <p className="lead">
        <i className="fa fa-user"></i> Let's get some information to make yout
        profile stand out
      </p>
      <small>*- required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <select name="status" onChange={(e) => onChange(e)} value={status}>
            <option value="" disabled>* Select Proffessional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            onChange={(e) => onChange(e)}
            value={company}
          />
          <small className="form-text">
            Could be your own company or one you work for
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            onChange={(e) => onChange(e)}
            value={website}
          />
          <small className="form-text">
            Could be yout ow or a company website
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={(e) => onChange(e)}
            value={location}
          />
          <small className="form-text">
            City & state suggested (eg Boston, MA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Skills"
            name="skills"
            onChange={(e) => onChange(e)}
            value={skills}
          />
          <small className="form-text">
            Please use comma separated values (eg HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Github Username"
            name="github"
            onChange={(e) => onChange(e)}
            value={github}
          />
          <small className="form-text">
            If you want your repos and a Github link, include your username
          </small>
        </div>
        <div className="form-group">
          <textarea
            name="bio"
            placeholder="A short bio of yourself"
            onChange={(e) => onChange(e)}
            value={bio}
          ></textarea>
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="mt-2">
          <button
            onClick={() => toogleSocialLinks(!socialLinks)}
            type="button"
            className="btn btn-light"
          >
            {socialLinks
              ? "Hide Social Network Links"
              : "Add Social Network Links"}
          </button>
          <span>Optional</span>
        </div>

        {socialLinks ? (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x"></i>
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                onChange={(e) => onChange(e)}
                value={twitter}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x"></i>
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                onChange={(e) => onChange(e)}
                value={facebook}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x"></i>
              <input
                type="text"
                placeholder="Youtube URL"
                name="youtube"
                onChange={(e) => onChange(e)}
                value={youtube}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x"></i>
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                onChange={(e) => onChange(e)}
                value={linkedin}
              />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x"></i>
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                onChange={(e) => onChange(e)}
                value={instagram}
              />
            </div>
          </Fragment>
        ) : (
          <Fragment></Fragment>
        )}
        <input type="submit" className="btn btn-primary mt-1" value="Submit" />
        <Link to="/dashboard" className="btn btn-light">
          Go back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propType=()=>({
  profile:PropTypes.object.isRequired,
  register:PropTypes.func.isRequired,
  getProfile:PropTypes.func.isRequired,
})

const mapStatetoProps = (state) =>( {
  profile: state.profile
});

export default connect(mapStatetoProps, { register,getProfile })(EditProfile);

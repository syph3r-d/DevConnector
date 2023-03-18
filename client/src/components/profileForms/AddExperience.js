import React, { Fragment } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { addExperience } from "../../actions/profile";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types'
import { useEffect } from "react";
const AddEducation = ({addExperience,alerts}) => {
  const [formData, setFormData] = useState({
    job_title: "",
    company: "",
    location: "",
    from: "",
    current: false,
    to: "",
    description: "",
  });

  const { job_title, company, location, from, current, to, description } =
    formData;

  const navigate=useNavigate();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(()=>{
    if(alerts !== null && alerts.length > 0){
      alerts.forEach(element => {
          if (element.alertType==='success'){
              navigate('/dashboard')
          }
      });
  }
  },[alerts,navigate])

  const onSubmit=(e)=>{
    e.preventDefault();
    addExperience(formData)
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Add an Experience</h1>
      <p className="lead">
        <i className="fa fa-code-branch"></i> Add any developer/programming
        postions that you have had in the past
      </p>
      <small>* - required field</small>
      <form className="form" onSubmit={(e)=>onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="job_title"
            onChange={(e) => onChange(e)}
            value={job_title}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Company"
            name="company"
            onChange={(e) => onChange(e)}
            value={company}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            onChange={(e) => onChange(e)}
            value={location}
          />
        </div>
        <div className="form-group">
          <h4 className="form-text">From Date</h4>
          <input
            type="date"
            name="from"
            onChange={(e) => onChange(e)}
            value={from}
          />
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            name="current"
            onChange={(e) => setFormData({ ...formData, current: !current })}
            value={current}
          />{" "}
          Current Job
        </div>
        <div className="form-group">
          <h4 className="form-text">To Date</h4>

          {!current ? (
            <Fragment>
              <input
                type="date"
                name="to"
                onChange={(e) => onChange(e)}
                value={to}
              />
            </Fragment>
          ) : (
            <Fragment>
              <input
                type="date"
                name="to"
                onChange={(e) => onChange(e)}
                value={to}
                disabled
              />
            </Fragment>
          )}
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Job Description"
            onChange={(e) => onChange(e)}
            value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary mt-2" />
        <Link to="/dashboard" className="btn btn-light">
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

addExperience.propType=()=>({
  alerts:PropTypes.string.isRequired,
  addEducation:PropTypes.func.isRequired,
})

const mapStatetoProps=state=>({
  alerts:state.alert
})
export default connect(mapStatetoProps,{addExperience})(AddEducation);

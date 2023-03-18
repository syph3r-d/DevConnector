import React, { Fragment } from 'react'
import { useEffect,useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { addEducation } from '../../actions/profile'
import PropTypes from 'prop-types'



const AddEducation = ({alerts,addEducation}) => {
    const [formData,setFormData]=useState({
        school:'',
        degree:'',
        fieldofstudy:'',
        from:'',
        current:false,
        to:'',
        description:''
    })

    const navigate=useNavigate();

    useEffect(()=>{
        if(alerts !== null && alerts.length > 0){
            alerts.forEach(element => {
                if (element.alertType==='success'){
                    navigate('/dashboard')
                }
            });
        }
    },[alerts,navigate])
    const {school,degree,fieldofstudy,from,current,to,description} = formData

    const onChange=e=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const onSubmit=e=>{
        e.preventDefault();
        addEducation(formData)

    }

  return (
    <Fragment>
        <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fa-solid fa-graduation-cap"></i> Add any school, bootcamp, etc
        that uou have attended
      </p>
      <small>* - required field</small>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            onChange={(e)=>onChange(e)}
            value={school}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            onChange={(e)=>onChange(e)}
            value={degree}
          />
        </div>
        <div className="form-group">
          <input type="text" placeholder="Field of Study" name="fieldofstudy" onChange={(e)=>onChange(e)} value={fieldofstudy} />
        </div>
        <div className="form-group">
          <h4 className="form-text">From Date</h4>
          <input type="date" name="from" onChange={(e)=>onChange(e)} value={from} />
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
        <div className="form-group"><input type="checkbox" onChange={(e)=>setFormData({...formData,current:!current})} /> Current School/University</div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            onChange={(e)=>onChange(e)} value={description}
          ></textarea>
        </div>
        <input type="submit" className="btn btn-primary mt-2" />
        <Link to="/dashboard" className="btn btn-light">Go Back</Link>
      </form>
    </Fragment>
  )
}

addEducation.propType=()=>({
    alerts:PropTypes.array.isRequired,
    addEducation:PropTypes.func.isRequired,
})

const mapStatetoProps=state=>({
    alerts:state.alert
})
export default connect(mapStatetoProps,{addEducation})(AddEducation)

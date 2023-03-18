import React from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import { postSubmit } from '../../actions/post'


const PostForm = ({postSubmit,alerts}) => {
    const [formData,setFormData]=useState({
        text:''
    })

    const navigate=useNavigate();

    useEffect(()=>{
        if(alerts !== null && alerts.length > 0){
            alerts.forEach(element => {
                if (element.alertType==='success'){
                    setFormData({text:''})
                }
            });
        }
    },[alerts,navigate])

    const {text}=formData;

    const onChange=e=>{
        setFormData({...formData,text:e.target.value})
    }

    const onSubmit=e=>{
        e.preventDefault();
        postSubmit(formData)
    }

  return (
    <Fragment>
        <h1 className="large text-primary">Posts</h1>
      <p className="lead">Welcome to the community</p>
      <div className="post-form">
        <div className="post-form-header bg-primary p-1">
          <h3>Say Something...</h3>
        </div>
        <form className="form mt-1" onSubmit={e=>onSubmit(e)}>
          <textarea cols="30" rows="5" placeholder="Create a post" name='text' onChange={e=>onChange(e)} value={text}></textarea>
          <input type="submit" className="btn btn-dark mt-1" value="Submit" />
        </form>
      </div>
    </Fragment>
  )
}

PostForm.propTypes = {
    alerts:PropTypes.array.isRequired,
    postSubmit:PropTypes.func.isRequired,
}

const mapStatetoProps=state=>({
    alerts:state.alert
})

export default connect(mapStatetoProps,{postSubmit})(PostForm)

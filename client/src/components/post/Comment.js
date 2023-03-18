import React from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import Moment from 'react-moment'
import { connect } from 'react-redux'
import { deleteComment } from '../../actions/post'
import { useParams } from 'react-router-dom'

const Comment = ({comment:{_id,user,text,name,avatar,date},auth,deleteComment,pid}) => {

  return (
    <Fragment>
      <div className="post bg-white mt-1 mb-1">
        <div>
          <img
            src={avatar}
            alt=""
          />
          <h4 className="text-primary">{name}</h4>
        </div>
        <div className="post-content">
          <p className="mb-1">
            {text}
          </p>
          <small>Posted on <Moment format='YYYY/MM/DD'>{date}</Moment></small>
        </div>
        <div className="post-buttons mt-1">
        {!auth.loading && user===auth.user._id && pid!==undefined ? <button className="btn btn-danger" onClick={()=>deleteComment({cid:_id,pid})}>
              <i className="fas fa-times"></i>
            </button> : <Fragment></Fragment>}
        </div>
      </div> 
    </Fragment>
  )
}

Comment.propTypes = {
    comment:PropTypes.object.isRequired,
    auth:PropTypes.object.isRequired,
}

const mapStatetoProps=state=>({
    auth:state.auth
})

export default connect(mapStatetoProps,{deleteComment})(Comment)

import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Moment from 'react-moment'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { postLike,postUnlike,postDelete } from "../../actions/post";

const PostCard = ({post:{_id,user,text,name,avatar,likes,comments,date},auth,postLike,postUnlike,postDelete}) => {
  return (
    <Fragment>
      <div className="post bg-white mt-1">
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
          <small>Posted on {<Moment format="YYYY/MM/DD">{date}</Moment>}</small>
          <div className="post-buttons mt-1">
            <button className="btn btn-light" onClick={()=>postLike(_id)}>
              <i className="fas fa-thumbs-up"></i>
              <span> {likes.length}</span>
            </button>
            <button className="btn btn-light" onClick={()=>postUnlike(_id)}>
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/post/${_id}`} className="btn btn-primary">
              Discussion <span className='comment-count'>{comments.length}</span>
            </Link>
            {!auth.loading && user===auth.user._id ? <button className="btn btn-danger" onClick={()=>postDelete(_id)}>
              <i className="fas fa-times"></i>
            </button> : <Fragment></Fragment>}
            
          </div>
        </div>
      </div>
    </Fragment>
  );
};

PostCard.propTypes = {
    auth:PropTypes.object.isRequired,
    postLike:PropTypes.func.isRequired,
    postUnlike:PropTypes.func.isRequired,
};

const mapStatetoProps=state=>({
    auth:state.auth,
})

export default connect(mapStatetoProps,{postLike,postUnlike,postDelete})(PostCard);

import React, { Fragment } from "react";
import { useState } from "react";
import PropTypes from "prop-types";
import { postComment } from "../../actions/post";
import { connect } from "react-redux";
import { useEffect } from "react";

const PostComment = ({ postComment, post: { _id },alerts }) => {
  const [formData, setFormData] = useState({
    text: "",
  });

  useEffect(()=>{
    if(alerts !== null && alerts.length > 0){
        alerts.forEach(element => {
            if (element.alertType==='success'){
                setFormData({text:''})
            }
        });
    }
},[alerts])

  const { text } = formData;
  return (
    <Fragment>
      <div className="post-form">
        <div className="post-form-header bg-primary p-1">
          <h3>Leave A Comment</h3>
        </div>
        <form
          className="form mt-1"
          onSubmit={(e) => {
            e.preventDefault();
            postComment({ id:_id, text });
          }}
        >
          <textarea
            cols="30"
            rows="5"
            placeholder="Comment on this post"
            name="text"
            onChange={(e) => setFormData({ ...formData, text: e.target.value })}
            value={text}
          ></textarea>
          <input type="submit" className="btn btn-dark mt-1" value="Submit" />
        </form>
      </div>
    </Fragment>
  );
};

PostComment.propTypes = {
  postComment: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  alerts:PropTypes.array.isRequired,
};

const mapStatetoProps=state=>({
    alerts:state.alert
})

export default connect(mapStatetoProps, { postComment })(PostComment);

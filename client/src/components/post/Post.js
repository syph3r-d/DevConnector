import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { getPostById } from "../../actions/post";
import { connect } from "react-redux";
import Comment from "./Comment";
import Spinner from "../layout/Spinner";
import PostComment from "./PostComment";

const Post = ({ getPostById, post, loading }) => {
  let { id } = useParams();
  useEffect(() => {
    getPostById(id);
  }, [getPostById, id,post]);
  return (
    <Fragment>
      {!loading && post.post !== null ? (
        <Fragment>
          <Comment comment={post.post} />
          <PostComment post={post.post} />
          <div className="post-comments">
            {post.post.comments.length > 0 ? (
              post.post.comments.map((com) => <Comment key={com._id} comment={com} pid={post.post._id} />)
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <Spinner />
        </Fragment>
      )}
    </Fragment>
  );
};

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPostById: PropTypes.func.isRequired,
};

const mapStatetoProps = (state) => ({
  post: state.post,
});

export default connect(mapStatetoProps, { getPostById })(Post);

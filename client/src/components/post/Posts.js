import React,{Fragment} from "react";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { getPosts } from "../../actions/post";
import { connect } from "react-redux";
import PostForm from "./PostForm";
import PostCard from "./PostCard";
import Spinner from "../layout/Spinner";

const Posts = ({ getPosts,posts:{posts,loading} }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <Fragment>
      <PostForm/>
      <div className="posts">
        {!loading && posts.length>0 ? posts.map(post=>(
          <PostCard key={post._id} post={post}/>
        )):<Fragment><Spinner/></Fragment>}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  posts:PropTypes.object.isRequired,
};

const mapStatetoProps=state=>({
  posts:state.post
})

export default connect(mapStatetoProps, { getPosts })(Posts);

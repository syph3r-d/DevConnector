import axios from "axios";
import {
  GET_POSTS,
  LIKES_UPDATED,
  POST_ERROR,
  POSTS_UPDATED,
  POST_DELETED,
  GET_POST,
  COMMENTS_UPDATED,
} from "./types";
import { setAlert } from "./alert";

export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("api/post");
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.error;
    errors.forEach((element) => {
      dispatch(setAlert(element.msg, "danger"));
    });
    dispatch({
      type: POST_ERROR,
    });
  }
};

export const postLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`api/post/like/${id}`);
    dispatch({
      type: LIKES_UPDATED,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    dispatch(setAlert(err.response.data.msg, "danger"));
  }
};
export const postUnlike = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`api/post/unlike/${id}`);
    dispatch({
      type: LIKES_UPDATED,
      payload: { id, likes: res.data },
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    dispatch(setAlert(err.response.data.msg, "danger"));
  }
};

export const postDelete = (id) => async (dispatch) => {
  try {
    await axios.delete(`api/post/${id}`);
    dispatch({
      type: POST_DELETED,
      payload: id,
    });
    dispatch(setAlert("Post Deleted", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    dispatch(setAlert(err.response.data.msg, "danger"));
  }
};

export const getPostById = (id) => async (dispatch) => {
  try {
    axios.defaults.baseURL = "http://10.10.25.213:3000/";
    const res = await axios.get(`api/post/${id}`);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    dispatch(setAlert(err.response.data.msg, "danger"));
  }
};

export const postSubmit =
  ({ text }) =>
  async (dispatch) => {
    const body = {
      text,
    };

    const config = {
      headers: {
        "content-type": "application/json",
      },
    };

    try {
      const res = await axios.post("api/post", body, config);
      dispatch({
        type: POSTS_UPDATED,
        payload: res.data,
      });
      dispatch(setAlert("Posted Successfully", "success"));
    } catch (err) {
      dispatch({
        type: POST_ERROR,
      });
      dispatch(setAlert(err.response.data.msg, "danger"));
    }
  };

export const postComment=({id,text})=>async dispatch=>{
  const body={
    text
  }

  const config={
    headers:{
      'content-type':'application/json'
    }
  }

  try {
    axios.defaults.baseURL = "http://localhost:3000/";
    const res=await axios.post(`api/post/comment/${id}`,body,config)
    dispatch({
      type:COMMENTS_UPDATED,
      payload:{id,comments:res.body}
    })
    dispatch(setAlert('Comment Added','success'))
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    dispatch(setAlert(err.response.data.msg, "danger"));
  }
}

export const deleteComment=({cid,pid})=>async dispatch=>{
  try {
    const res = await axios.delete(`api/post/${pid}/${cid}`);
    dispatch({
      type: COMMENTS_UPDATED,
      payload:{id:pid,comments:res.body}
    });
    dispatch(setAlert("Post Deleted", "success"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
    });
    dispatch(setAlert(err.response.data.msg, "danger"));
  }
}
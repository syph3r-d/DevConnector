import { GET_POSTS, POST_ERROR,LIKES_UPDATED,POSTS_UPDATED, POST_DELETED,GET_POST, COMMENTS_UPDATED } from "../actions/types";

const initialstate = {
  posts: [],
  post: null,
  loading: true,
  errors: {},
};

export default function post(state = initialstate, action) {
  const { payload, type } = action;
  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    case GET_POST:
      return {
        ...state,
        post: payload,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case LIKES_UPDATED:
      return {
        ...state,
        posts:state.posts.map(post=> post._id===payload.id ? {...post,likes:payload.likes}: post),
        loading:false,
      }
    case POSTS_UPDATED:
      return{
        ...state,
        loading:false,
        posts:[...state.posts,payload]
      }

    case POST_DELETED:
      return{
        ...state,
        loading:false,
        posts:state.posts.filter(post=>post._id!==payload)
      }
    case COMMENTS_UPDATED:
      return{
        ...state,
        loading:false,
        posts:state.posts.map(post=> post._id===payload.id ? {...post,comments:payload.comments}: post),
      }

    
    default:
        return state;
  }
}

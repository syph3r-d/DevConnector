import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR,PROFILE_UPDATED,ACCOUNT_DELETED, CLEAR_PROFILE,GET_PROFILES } from "./types";
import { setAlert } from "./alert";

//load profile
export const getProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, code: err.response.status },
    });
  }
};
//get profiles
export const getProfiles = () => async (dispatch) => {
  // dispatch({type:CLEAR_PROFILE});
  try {
    const res = await axios.get("api/profile/");
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, code: err.response.status },
    });
  }
};
//get profiles
export const getProfileById = (userID) => async (dispatch) => {
  axios.defaults.baseURL='http://10.10.25.213:3000/';
  try {
    const res = await axios.get(`api/profile/user/${userID}`);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, code: err.response.status },
    });
  }
};

//create profile
export const register =
  (
    {
      status,
      company,
      website,
      location,
      skills,
      github,
      bio,
      twitter,
      facebook,
      youtube,
      linkedin,
      instagram,
    },
    edit = false
  ) =>
  async (dispatch) => {
    const body = JSON.stringify({
      status,
      company,
      website,
      location,
      skills,
      github,
      bio,
      twitter,
      facebook,
      youtube,
      linkedin,
      instagram,
    });

    const config = {
      headers: { "content-type": "application/json" },
    };

    try {
      const res = await axios.post("api/profile", body, config);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
      if (edit) {
        dispatch(setAlert("Edited Profile Successfully", "success"));
      } else {
        dispatch(setAlert("Created Profile successfully", "success"));
      }
    } catch (err) {
      const errors = err.response.data.error;
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  };

//add experience
export const addExperience =
  (
    { job_title, company, location, from, current, to, description }
  ) =>
  async (dispatch) => {
    const body = JSON.stringify({
      title:job_title, company, location, from, current, to, description
    });

    const config = {
      headers: { "content-type": "application/json" },
    };

    try {
      const res=await axios.put("api/profile/experience", body, config);
      dispatch({
        type: PROFILE_UPDATED,
        payload:res.data
      });
      dispatch(setAlert("Experience Updated","success"))
    } catch (err) {
      const errors = err.response.data.error;
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  };
//add education
export const addEducation =
  (
    { school,degree,fieldofstudy,from,current,to,description}
  ) =>
  async (dispatch) => {
    const body = JSON.stringify({
      school,degree,fieldofstudy,from,current,to,description
    });

    const config = {
      headers: { "content-type": "application/json" },
    };

    try {
      const res=await axios.put("api/profile/education", body, config);
      dispatch({
        type: PROFILE_UPDATED,
        payload:res.data
      });
      dispatch(setAlert("Education Updated","success"))
    } catch (err) {
      const errors = err.response.data.error;
      errors.forEach((element) => {
        dispatch(setAlert(element.msg, "danger"));
      });
      dispatch({
        type: PROFILE_ERROR,
      });
    }
  };

//delete education
export const deleteEdu=({_id})=>async dispatch=>{
  try {
    const res=await axios.delete(`api/profile/education/${_id}`)
    dispatch({
      type:PROFILE_UPDATED,
      payload:res.data
    })
    dispatch(setAlert('Education Removed','success'))
  } catch (error) {
    const errors=error.response.data.error;
    errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
  }
}
//delete experience
export const deleteExp=({_id})=>async dispatch=>{
  try {
    const res=await axios.delete(`api/profile/experience/${_id}`)
    dispatch({
      type:PROFILE_UPDATED,
      payload:res.data
    })
    dispatch(setAlert('Experience Removed','success'))
  } catch (error) {
    const errors=error.response.data.error;
    errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
  }
}

//delete account
export const deleteAcc=()=>async dispatch=>{
  try {
    await axios.delete('/api/profile')
    dispatch({
      type:ACCOUNT_DELETED
    })
    dispatch({
      type:CLEAR_PROFILE
    })
  } catch (error) {
    const errors=error.response.data.error;
    errors.forEach(err=>dispatch(setAlert(err.msg,'danger')))
  }
}

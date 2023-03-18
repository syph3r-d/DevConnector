import React, { useState, Fragment } from "react";
import { Link } from "react-router-dom";

import { setAlert } from "../../actions/alert";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffect } from "react";

const Login = ({ setAlert, login,auth:{isAuthenticated,loading,user} }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (isAuthenticated) {
      window.location = "/dashboard";
    }
  }, [isAuthenticated]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password } = formData;

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      login({ email, password });
    } catch (err) {
      const errors = err.response.data.errors;
      errors.forEach((element) => {
        setAlert(element.msg, "danger");
      });
    }
  };

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">Sign In to Your Account</p>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <div className="small form-text"></div>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
            onChange={(e) => onChange(e)}
          />
        </div>
        <input
          type="submit"
          value="Login"
          className="btn btn-primary"
          onSubmit={(e) => onSubmit(e)}
        />
      </form>
      <p className="mt-1">
        Don't have an account? <Link to="/register">Sign up</Link>
      </p>
    </Fragment>
  );
};

login.propTypes = {
  setAlert: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStatetoProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStatetoProps, { setAlert, login })(Login);

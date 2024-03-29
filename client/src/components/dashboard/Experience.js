import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteExp } from "../../actions/profile";
import PropTypes from 'prop-types'


const Experience = ({ experiences, deleteExp }) => {
  const experience = experiences.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className="hide-sm">{exp.title}</td>
      <td className="hide-sm">
        <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {" "}
        {exp.current ? "Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
      </td>
      <td>
        <button className="btn btn-danger" onClick={(e) => deleteExp(exp._id)}>
          Delete
        </button>
      </td>
    </tr>
  ));
  return (
    <Fragment>
      <h2 className="mt-2 mb-2">Experience Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th className="hide-sm">Title</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{experience}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propType=()=>({
  deleteExp:PropTypes.func.isRequired,
 })

export default connect(null, { deleteExp })(Experience);

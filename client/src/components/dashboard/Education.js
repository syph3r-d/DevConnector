import React from "react";
import { Fragment } from "react";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteEdu } from "../../actions/profile";
import PropTypes from 'prop-types'


const Education = ({ educations,deleteEdu }) => {


    const education = educations.map((exp) => (
      <tr key={exp._id}>
        <td>{exp.school}</td>
        <td className="hide-sm">{exp.degree}</td>
        <td className="hide-sm">
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.current ? "Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </td>
        <td>
          <button className="btn btn-danger" onClick={e=>deleteEdu(exp._id)}>Delete</button>
        </td>
      </tr>
    ));
  return (
    <Fragment>
      <h2 className="mt-2 mb-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
          </thead>
          <tbody>{education}</tbody>
      </table>
    </Fragment>
  );
};

Education.propType=()=>({
 deleteEdu:PropTypes.func.isRequired,
})

export default connect(null,{deleteEdu})(Education);

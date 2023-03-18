import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEdu = ({profile:{education}}) => {
  return (
    <Fragment>
      <div className="profile-education bg-white p-1">
              <h2 className="text-primary">Education</h2>
              {education.length>0 ? education.map(edu=>(<Fragment key={edu._id}><div>
                <h3>{edu.school}</h3>
                <p><Moment format="YYYY/MM/DD">{edu.from}</Moment> -{" "}
          {edu.current ? "Now" : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}</p>
                <p>
                  <strong>Degree : </strong>{edu.degree}
                </p>
                <p>
                  <strong>Field of Study : </strong>{edu.fieldofstudy}
                </p>
                <p>
                  <strong>Description : </strong>{edu.description}
                </p>
              </div>
              <div className="line"></div></Fragment>)) : <Fragment></Fragment>}
            </div>
    </Fragment>
  )
}

ProfileEdu.propTypes = {
    profile:PropTypes.object.isRequired,
}

export default ProfileEdu

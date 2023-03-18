import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileExp = ({profile:{experience}}) => {
  return (
    <Fragment>
      <div className="profile-experience bg-white p-1">
              <h2 className="text-primary">Experience</h2>
              {experience.length>0 ? experience.map(exp=>(<Fragment key={exp._id}><div>
                <h3>{exp.company}</h3>
                <p><Moment format="YYYY/MM/DD">{exp.from}</Moment> -{" "}
          {exp.current ? "Now" : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}</p>
                <p>
                  <strong>Position : </strong>{exp.title}
                </p>
                <p>
                  <strong>Description : </strong>{exp.description}
                </p>
              </div>
              <div className="line"></div></Fragment>)) : <Fragment></Fragment>}
            </div>
    </Fragment>
  )
}

ProfileExp.propTypes = {
    profile:PropTypes.object.isRequired,
}

export default ProfileExp

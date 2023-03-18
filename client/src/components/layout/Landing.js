import React from 'react'
import { Link,Navigate } from 'react-router-dom'
import { connect } from 'react-redux'

const Landing = ({isAuthenticated}) => {
  if(isAuthenticated){
    return <Navigate to='/dashboard' replace/>
  }
  return (
    <section
      className="landing"
    >
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large">Developer Connector</h1>
          <p className="lead">
            Create developer profile/portfolio,share posts and get help from
            other developers
          </p>
          <div className="buttons">
            <Link to="/register" className="btn btn-primary">Sign up</Link>
            <Link to="/login" className="btn btn">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

const mapStatetoProps=state=>({
  isAuthenticated:state.auth.isAuthenticated
})

export default connect(mapStatetoProps)(Landing)

import {React,Fragment} from 'react'
import { connect } from 'react-redux'
import { deleteAcc } from '../../actions/profile'
import PropTypes from 'prop-types'


const DeleteAccount = ({deleteAcc}) => {
  return (
    <Fragment>
      <div className="mt-2">
        <button className="btn btn-danger" onClick={e=>deleteAcc()}>
            <i className="fas fa-user-minus"></i> Delete My Account
        </button>
      </div>
    </Fragment>
  )
}

DeleteAccount.propType=()=>({
    deleteAcc:PropTypes.func.isRequired,
})

export default connect(null,{deleteAcc})(DeleteAccount)

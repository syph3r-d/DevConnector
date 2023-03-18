import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
const Protected = ({auth:{isAuthenticated,loading}, children} ) => {
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const mapStatetoProps=state=>({
    auth:state.auth
})
export default connect(mapStatetoProps)(Protected);

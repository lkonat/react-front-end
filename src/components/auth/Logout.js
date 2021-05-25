import { Link, Redirect } from 'react-router-dom';
import '../../styles/Login.css';
import setAuthToken from "../../utils/setAuthToken.js";
import {logout} from "../../actions/auth.js";
import { connect } from 'react-redux';
const Logout = ({logout}) => {
  // return <Redirect to="/login" />;
  return (
    <div className="login-container">
     <h1>Bye Bye!</h1>
    </div>
  );
};
export default connect(null,{logout})(Logout);

import React, { Fragment } from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import {logout} from "../../actions/auth.js";
import '../../styles/Navbar.css';
function Navbar({authInfo,logout}) {
  const signout = ()=>{
    logout();
  };
  const loginLinks =(
    <ul>
      <li>
        <div style={{"color":"coral"}}><i className="fa fa-user" aria-hidden="true"></i> {authInfo?.user?.name}</div>
      </li>
      <li>
        <Link to="/logout" onClick={signout}>logout</Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>
      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className="navbar">
      <h1 className="logoIcon">
        <Link to="/" >LK</Link>
      </h1>
      <Fragment>{authInfo.isAuthenticated?loginLinks:guestLinks}</Fragment>
    </nav>
  );
}
const mapStateToProps = (state) => ({
  authInfo: state.auth
});
export default connect(mapStateToProps,{logout})(Navbar);

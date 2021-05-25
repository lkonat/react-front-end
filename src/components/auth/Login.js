import React, {useState,useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../../styles/Login.css';
import {logUserIn} from "../../actions/auth.js";
import setAuthToken from "../../utils/setAuthToken.js";
import {AuthContext} from "../../context/auth.js";
import { connect } from 'react-redux';
import {setAlert} from "../../actions/alert.js";
const Login = ({authInfo,setAlert,logUserIn}) => {
  const [formData, setFormData] = useState({
    email:authInfo.justSignedEmail?authInfo.justSignedEmail:'',
    password: ''
  });
  const {auth,updateAuth} = useContext(AuthContext);
  const { email, password } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    let res = await logUserIn({password, email});
    const token = res.data?res.data.token:false;
    setAuthToken(token);
    if(token){
      //updateAuth({authenticated:true});
      setAlert("authenticated","success");
    }else {
      //updateAuth({authenticated:false});
      setAlert("could not authenticate","danger");
    }
  };
  if (authInfo && authInfo.isAuthenticated) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="login-container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user" /> Sign Into Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="5"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </div>
  );
};
const mapStateToProps = (state) => ({
  authInfo: state.auth
});
export default connect(mapStateToProps,{setAlert,logUserIn})(Login);

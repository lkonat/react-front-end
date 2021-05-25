import React, {useState,useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../styles/Login.css';
import {AuthContext} from "../context/auth.js";
const Dashboard = () => {
  const {auth,updateAuth} = useContext(AuthContext);
  return (
    <div className="login-container">
      <h1>Dashboard</h1>
    </div>
  );
};
export default Dashboard;

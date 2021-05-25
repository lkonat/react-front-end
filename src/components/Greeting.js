import React, {Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import '../styles/Greeting.css'
const Greeting = () => {
  return (
    <div className="greeting">
      <h1>Hi my name is,</h1>
      <h2 class="big-heading">Name lastName.</h2>
      <h3 class="big-heading">this is the description.</h3>
    </div>
  );
};
export default Greeting;

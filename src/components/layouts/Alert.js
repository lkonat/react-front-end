import React, {useState, useContext} from 'react';
import { connect } from 'react-redux';

function Alert({alerts}){
  return alerts.map((alert)=>(
    <div key={alert.id} className={`alert alert-${alert.alertype}`} role="alert">{alert.msg}</div>
  ));
};
const mapStateToProps = (state) => ({
  alerts: state.alerts
});
export default connect(mapStateToProps)(Alert);

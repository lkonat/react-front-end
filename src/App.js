
import React, { useEffect } from 'react';
import { BrowserRouter,Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from "./components/layouts/Navbar";
import Alert from "./components/layouts/Alert";
import Login from "./components/auth/Login";
import Logout from "./components/auth/Logout";
import Register from "./components/auth/Register";
import Dashboard from "./components/Dashboard.js";
import AuthProvider from "./context/auth.js";
import { Provider } from 'react-redux';
import store from './store';
import { getAuth } from './actions/auth.js';
import setAuthToken  from './utils/setAuthToken.js';
import { LOGOUT } from './actions/types';
import PrivateRoute  from './components/routing/PrivateRoute.js';
import NotFound from './components/layouts/NotFound.js';
import Landing from './components/layouts/Landing.js';
function App() {
  useEffect(()=>{
    console.log("useEffect");
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(getAuth());
    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch({ type: LOGOUT });
      }else {
        setAuthToken(localStorage.token);
        store.dispatch(getAuth());
      }
    });
  },[]);
  return (
    <Provider store={store}>
      <AuthProvider>
      <div className="wrapper">
        <BrowserRouter>
          <Alert/>
          <Navbar/>
          <Switch>
            <Route exact path="/" component={Landing}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <PrivateRoute exact path="/dashboard" component={Dashboard}/>
            <Route exact path="/logout" component={Logout}/>
            <Route component={NotFound}/>
          </Switch>
        </BrowserRouter>
      </div>
      </AuthProvider>
    </Provider>
  );
}

export default App;

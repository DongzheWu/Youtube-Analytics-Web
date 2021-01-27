import React from "react";
import logo from '../assets/img/google-icon.svg';
import '../assets/css/loginboard.css';

/** This component is a page to ask user to log in. */
const Loginboard = () => {

  return (
    <main className="dash-container">

      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>You are not signed in. Click here to sign in.</p>
        <button id="loginButton"><a href="/auth/google" style={{ color:'black'}}>Login with Google</a></button>
      </header>
    </main>
  );
}
export default Loginboard;
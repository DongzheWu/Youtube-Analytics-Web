import React, { useState } from "react";
import logo from './google-icon.svg';
import '../assets/css/Loginboard.css';

function Loginboard(){



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
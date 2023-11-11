import React from "react";
import { Link } from "react-router-dom";


const InputForm = props => {


  return (
    <div className="loginBox">
      <form id="loginForm">
        <div id="loginHeaderBox">
          <h2 id="loginHeader">Peau Humaine</h2>
        </div>
        <div className="inputField">

          <input type="text" name="username" placeholder="Enter Username" />
        </div>
        <div className="inputField">
          <input type="password" name="username" placeholder="Enter Password" />
        </div>
        <Link id="loginLink">
          <button id="loginButton" type="button">Login</button>
        </Link>
      </form>
    </div>
  )
}

export default InputForm;
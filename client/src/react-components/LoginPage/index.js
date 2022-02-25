import React from "react";
import "./styles.css";
import { Link } from 'react-router-dom';
import logo from './logo.png';
import loginImage from './LoginPageImage.jpeg';

class LoginPage extends React.Component {
    render() {
      return (
        <div className="loginPage">
            <div><img src={logo} className="logo" alt="logo"/></div>
            <div><img src={loginImage} className="loginImage" alt="loginImage"/></div>
            <main id="main-holder">
                <h1 className="login-form-header">Sign-In</h1>
                    <div>
                        <label className="login-form-text"><b>Username</b></label>
                        <input type="text" className="login-form-field"/>
                    </div>
                    <div>
                        <label className="login-form-text"><b>Password</b></label>
                        <input type="password" className="login-form-field"/>
                    </div>

                    <Link to={'/navigationmenu'}>
                        <button className="login-form-submit">
                            Sign-In
                        </button>
                    </Link>
            </main>
            
        </div>
      );
    }
  }


export default LoginPage;
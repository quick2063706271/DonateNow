import React from "react";
import "./styles.css";
import { Link } from 'react-router-dom';
import logo from './logo.png';
import loginImage from './LoginPageImage.jpeg';
import { updateLoginForm, login, checkSession } from "../../actions/user";

class LoginPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            initialState: true,
            error: true,
            message: "",
            countdown: -1
        };
    }

    componentDidMount() {
        checkSession(this);
    }

    onKeyDown(event){
        if(event.key === 'Enter'){
            event.preventDefault();
            document.getElementById("submit").click();
        }
    }

    render() {
      return (
        <div className="loginPage">
            <div><img src={logo} className="logo" alt="logo"/></div>
            <div><img src={loginImage} className="loginImage" alt="loginImage"/></div>
            <main id="main-holder">
                <h1 className="login-form-header">Sign-In</h1>
                    <div>
                        <label id="username" className="login-form-text"><b>Email</b></label>
                        <input type="text" name="email" onKeyDown={this.onKeyDown.bind(this)} className="login-form-field" value={this.state.email} onChange = {e => updateLoginForm(this, e.target)} required/>
                    </div>

                    <div>
                        <label id="password" className="login-form-text"><b>Password</b></label>
                        <input type="password" name="password" onKeyDown={this.onKeyDown.bind(this)} className="login-form-field" value={this.state.password} onChange = {e => updateLoginForm(this, e.target)} required/>
                    </div>
                    
                    <div>
                        <input id="submit" type="submit" name="submit" className="login-form-submit" onClick={() => login(this)}/>
                    </div>
                    {this.state.initialState ? <div></div> : this.state.error ? <div className="login-form-error">{this.state.message}</div> : <div className="login-form-success">{this.state.message}</div>}

                    <Link to={'/createanaccount'}>
                        <div className="login-form-create"><u>Create an Account</u></div>
                    </Link>
            </main>
        </div>
      );
    }
  }


export default LoginPage;

import React from "react";
import "./styles.css";
import { Link, Navigate } from 'react-router-dom';
import logo from './logo.png';
import loginImage from './LoginPageImage.jpeg';

class LoginPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            errormsg: false,
            valid: false
        }
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    handleClick (event) {
        // Get usernames and passwords from server
        // Code below requires server call
        const database = [
            {
                username: "user@user.com",
                password: "user"
            },
            {
                username: "admin@admin.com",
                password: "admin"
            }
        ];

        // Find user in database
        const userData = database.find((user) => user.username === this.state.username);

        // Verify user information
        if (userData) {
            if (userData.password !== this.state.password) {
                // Invalid password
                console.log("invalid password")
                this.setState({
                    errormsg: true
                })
            } else {
                console.log("valid")
                this.setState({
                    valid: true
                })
            }
        } else {
            // Username not found
            //setErrorMessages({ name: "uname", message: errors.uname });
            console.log("username not found")
            this.setState({
                errormsg: true
            })
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
                        <label className="login-form-text"><b>Username</b></label>
                        <input type="text" name="username" className="login-form-field" value={this.state.username} onChange = {event => this.handleInputChange(event)} required/>
                    </div>
                    <div>
                        <label className="login-form-text"><b>Password</b></label>
                        <input type="password" name="password" className="login-form-field" value={this.state.password} onChange = {event => this.handleInputChange(event)} required/>
                    </div>
                    <div>
                        <input type="submit" name="submit" className="login-form-submit" onClick={(event) => this.handleClick(event)}/>
                        {this.state.valid ? <Navigate to='/defaultsearch'/> : null}
                    </div>
                    {this.state.errormsg ? <div className="login-form-error">Incorrect username or password!</div> : null}

                    <Link to={'/createanaccount'}>
                        <div className="login-form-create"><u>Create an Account</u></div>
                    </Link>

            </main>

        </div>
      );
    }
  }


export default LoginPage;

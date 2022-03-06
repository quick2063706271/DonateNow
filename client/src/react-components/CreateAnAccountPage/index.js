import React from "react";
import "./styles.css";
import { Link, Navigate } from 'react-router-dom';
import logo from './logo.png';
import loginImage from './LoginPageImage.jpeg';
import StickyFooter from "../StickyFooter";
import database from '../../database'

class CreateAnAccountPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            username: "",
            password: "",
            retypePassword: "",
            error: false,
            errormsg: "",
            valid: false,
            users: {}
        }
    }

    // Get usernames and passwords from server
    // Code below requires server call
    initStateInfo = () =>{
        this.setState({
            users: database.users,
          }, () => console.log(this.state))
    }

    componentDidMount() {
        this.initStateInfo();
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
        const userData = this.state.users.find((user) => user.username === this.state.username);

        if (userData) {
            this.setState({
                error: true,
                errormsg: "Duplicate username!"
            })
        } else {
            if (this.state.password !== this.state.retypePassword) {
                this.setState({
                    error: true,
                    errormsg: "Passwords do not match!"
                })
            } else {
                this.setState({
                    valid: true,
                    error: false
                })
                // Add a new pair of username and password to server
                // Code below requires server call
                const maxUserId = this.state.users.reduce((prev, curr) => (prev.userId > curr.userId) ? prev : curr, 0)
                database.users.push({userId: maxUserId.userId+1, username: this.state.username, password: this.state.password})
            }
        }
    }

    render() {
      return (
        <div className="loginPage">
            <div><img src={logo} className="logo" alt="logo"/></div>
            <div><img src={loginImage} className="loginImage" alt="loginImage"/></div>
            <main id="main-holder">
                <h1 className="login-form-header">Create an Account</h1>
                    <div>
                        <label className="login-form-text"><b>Username</b></label>
                        <input type="text" name="username" className="login-form-field" value={this.state.username} onChange = {event => this.handleInputChange(event)} required/>
                    </div>
                    <div>
                        <label className="login-form-text"><b>Password</b></label>
                        <input type="password" name="password" className="login-form-field" value={this.state.password} onChange = {event => this.handleInputChange(event)} required/>
                    </div>
                    <div>
                        <label className="login-form-text"><b>Retype Password</b></label>
                        <input type="password" name="retypePassword" className="login-form-field-retype" value={this.state.retypePassword} onChange = {event => this.handleInputChange(event)} required/>
                    </div>
                    <div>
                        <input type="submit" name="submit" className="login-form-submit" onClick={(event) => this.handleClick(event)}/>
                    </div>
                    {(this.state.error) ? <div className="login-form-error">{this.state.errormsg}</div> : null}
                    {(this.state.valid) ? <div className="login-form-success">Success! Account Created!</div> : null}

                    <Link to={'/login'}>
                        <div className="login-form-create"><u>Back to Sign-In</u></div>
                    </Link>

            </main>

            <div>
                <StickyFooter/>
            </div>

        </div>
      );
    }
  }


export default CreateAnAccountPage;

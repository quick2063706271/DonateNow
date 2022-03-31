import React from "react";
import "./styles.css";
import { Link, Navigate } from 'react-router-dom';
import logo from './logo.png';
import loginImage from './LoginPageImage.jpeg';
import database from '../../database'
import { updateLoginForm, login } from "../../actions/user";

class LoginPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            userId: this.props.userId,
            email: "",
            password: "",
            errormsg: false,
            valid: false,
            user: null
        };
    }

    componentDidMount() {

    }

    setLoginState = (id, errormsg, valid) => {
		this.setState({
			userId: id,
            errormsg: errormsg,
            valid: valid
		}, () => console.log(this.state))
	} 

    // handleInputChange(event) {
    //     const target = event.target
    //     const value = target.value
    //     const name = target.name
    //     this.setState({
    //         [name]: value
    //     })
    // }

    // handleClick (event) {
    //     console.log(this.state.userId)
    //     const userData = database.users.filter((user) => user.username === this.state.username)[0];
        
    //     if (userData) {
    //         if (userData.password !== this.state.password) {
    //             console.log("invalid password")
    //             this.setState({
    //                 errormsg: true
    //             })
    //         } else {
    //             console.log("valid")
    //             this.setState({
    //                 valid: true,
    //                 user: userData
    //             })
    //             // console.log("login success", userData.userId)
    //             this.props.setUserId(userData.userId);
    //         }
    //     } else {
    //         console.log("username not found")
    //         this.setState({
    //             errormsg: true
    //         })
    //     }

    // }

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
                        <label id="username" className="login-form-text"><b>Username</b></label>
                        <input type="text" name="email" onKeyDown={this.onKeyDown.bind(this)} className="login-form-field" value={this.state.email} onChange = {e => updateLoginForm(this, e.target)} required/>
                    </div>

                    <div>
                        <label id="password" className="login-form-text"><b>Password</b></label>
                        <input type="password" name="password" onKeyDown={this.onKeyDown.bind(this)} className="login-form-field" value={this.state.password} onChange = {e => updateLoginForm(this, e.target)} required/>
                    </div>
                    
                    <div>
                        <input id="submit" type="submit" name="submit" className="login-form-submit" onClick={() => login(this, this.props)}/>
                        {(!this.state.valid) ? null : <Navigate to='/search'/>}
                        {/*{(!this.state.valid) ? null : this.state.user.admin ? <Navigate to='/search'/> : <Navigate to='/search'/>}*/}
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

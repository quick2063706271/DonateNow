import React from "react";
import "./styles.css";
import { Link } from 'react-router-dom';
import logo from './logo.png';
import loginImage from './LoginPageImage.jpeg';
import { userSignUp } from "../../actions/user"

class CreateAnAccountPage extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            retypePassword: "",
            error: false,
            errormsg: "",
            valid: false
        }
    }

    componentDidMount() {}

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    handleClick (event) {
        if (this.state.password !== this.state.retypePassword) {
            this.setState({
                error: true,
                errormsg: "Passwords do not match"
            })
        }
        userSignUp(this, this.state.email, this.state.password)
    }

    render() {
      return (
        <div className="loginPage">
            <div><img src={logo} className="logo" alt="logo"/></div>
            <div><img src={loginImage} className="loginImage" alt="loginImage"/></div>
            <main id="main-holder">
                <h1 className="login-form-header">Create an Account</h1>
                    <div>
                        <label className="login-form-text"><b>Email</b></label>
                        <input type="text" name="email" className="login-form-field" value={this.state.email} onChange = {event => this.handleInputChange(event)} required/>
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

        </div>
      );
    }
  }


export default CreateAnAccountPage;

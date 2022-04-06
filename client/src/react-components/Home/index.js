import React from "react";
import "./styles.css";
import home_pic from '../../homepage_pic.jpeg'
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchBox from "../SearchBox";
import StickyFooter from "../StickyFooter";
import { logout, checkSession } from "../../actions/user";

class Home extends React.Component {

    state = {
        userId: ""
    }

    componentDidMount() {
        checkSession(this)
    }

    logOutUser = () => {
        logout(this)
        window.location.reload(false)
    }

    render() {
        return (
            <div>
                <Logo/>
                <SearchBox id="searchbox"/>
                {this.state.userId ?
                    <Button 
                        id="loginButton"
                        style={{backgroundColor: "#C65D7B", color: "white", fontSize: "17px"}}
                        onClick={this.logOutUser}
                    >Log Out
                     </Button>
                :
                <Button 
                    id="loginButton"
                    style={{backgroundColor: "#C65D7B", color: "white", fontSize: "17px"}}
                    onClick={() => {
                        window.location.href = "/login"
                    }}
                 >
                    Log In/Sign up
                </Button>
                }
                
                <div id="home" ><img src={home_pic} id='home_pic' alt="home_pic"/></div>
                <div> <StickyFooter/> </div>
            </div>
        );
    }

}

export default Home;

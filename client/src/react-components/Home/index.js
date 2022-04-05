import React from "react";
import "./styles.css";
import home_pic from '../../homepage_pic.jpeg'
import Logo from '../Logo';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SearchBox from "../SearchBox";
import StickyFooter from "../StickyFooter";

class Home extends React.Component {
    render() {
        return (
            <div>
                <Logo/>
                <SearchBox id="searchbox"/>
                <Link Link to={'/login'} >
                    <Button id="loginButton" style={{backgroundColor: "#C65D7B", color: "white", fontSize: "17px"}}>Log In/Sign up</Button>
                </Link>
                <div id="home" ><img src={home_pic} id='home_pic' alt="home_pic"/></div>
                {/* <br></br> */}

                <div> <StickyFooter/> </div>
            </div>
        );
    }

}

export default Home;

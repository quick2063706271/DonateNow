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
                <SearchBox/>
                <Link Link to={'/login'}>
                    <Button id="loginButton" variant="outlined">Log In/Sign up</Button>
                </Link>
                <div id="home" ><img src={home_pic} id='home_pic' alt="home_pic"/></div>
                <StickyFooter/>
            </div>
        );
    }

}

export default Home;

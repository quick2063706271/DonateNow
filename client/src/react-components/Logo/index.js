import logo from '../../logo.png';
import React from "react";
import { Link } from 'react-router-dom';

class Logo extends React.Component {
    render() {
        return (
            
            <div id="appbar-logo" >
                <Link Link to={'/'}>
                     <img src={logo} id='logo' alt="appbar-logo"/>
                </Link>
            </div>
        );
    }

}

export default Logo;
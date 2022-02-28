import logo from '../../logo.png';
import React from "react";

class Logo extends React.Component {
    render() {
        return (
            <div>
                <div id="appbar-logo" ><img src={logo} id='logo' alt="appbar-logo"/></div>
            </div>
        );
    }

}

export default Logo;
import React from "react";
import NavigationMenu from "../NavigationMenu";
import logo from '../../logo.png';
import SearchBox from "../SearchBox";

import "./styles.css";

class AppBar extends React.Component {
    render() {
        return (
            <div>
                <div id="appbar-logo" ><img src={logo} id='logo' alt="appbar-logo"/></div>
                <SearchBox/>
                <NavigationMenu/>
            </div>
        );
    }

}

export default AppBar;
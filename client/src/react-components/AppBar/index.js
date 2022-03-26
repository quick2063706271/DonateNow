import React from "react";
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import "./styles.css";
import NavigationMenu from "../NavigationMenu";
import SearchBox from "../SearchBox";
import Logo from "../Logo";

class AppBar extends React.Component {
    render() {
        return (
            <div>
                <div id="app-bar">
                    <Logo/>
                    <SearchBox handleSearchButtonOnClick={this.props.handleSearchButtonOnClick}/>
                    <NavigationMenu/>
                </div>
            </div>
            
        );
    }

}

export default AppBar;

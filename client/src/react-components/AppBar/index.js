import React from "react";
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import "./styles.css";
import NavigationMenu from "../NavigationMenu";
import SearchBox from "../SearchBox";

class AppBar extends React.Component {
    render() {
        return (
            <div>
                <div id="appbar-logo" >
                    <Link to={'/'}>
                        <img src={logo} id='logo' alt="appbar-logo"/>
                    </Link>
                </div>

                <SearchBox handleSearchButtonOnClick={this.props.handleSearchButtonOnClick}/>
                <NavigationMenu/>
            </div>
        );
    }

}

export default AppBar;

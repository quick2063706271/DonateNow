import React from "react";
import logo from '../../logo.png';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import "./styles.css";
import SearchPage from '../SearchPage';
import DefaultSearchPage from '../DefaultSearchPage';
// Logo, SearchBox, and NavigationMenu are not used
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

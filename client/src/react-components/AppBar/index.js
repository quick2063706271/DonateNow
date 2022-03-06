import React from "react";
import logo from '../../logo.png';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import "./styles.css";
import DefaultSearchPage from '../DefaultSearchPage';
// Logo, SearchBox, and NavigationMenu are not used

class AppBar extends React.Component {

    constructor(props) {
        super(props);
    }

    state = {
        searchText: "",
        searchClicked: false,
        onSearchPage: false,
    };
  
    handleInputChange(event) {
        this.setState({
            searchText: event.target.value,
            searchClicked: false,
        }, () => console.log(this.state))
    }
  
    setSearchClicked = (event) => {
        event.preventDefault();
        this.setState({
          searchClicked: true,
        }, () => console.log(this.state))
        //this.setSearchPage();
    }

    setSearchPage = () => {
        if (window.location.pathname === "/search") {
            if (this.state.onSearchPage !== true) {
                this.setState({
                    onSearchPage: true,
                }, () => console.log(this.state))
            }
        } else {
            this.setState({
                onSearchPage: false,
            }, () => console.log(this.state))
        }
    }

    navigateToSearch = () => {
        var actions = []
        if (this.state.searchClicked) {
            actions.push(<Navigate to='/search'/>)
            actions.push(<DefaultSearchPage
                searchText = {this.state.searchText}
                searchClicked = {this.state.searchClicked}
                />)
        }
        return actions
    }

    render() {
        return (
            <div>
                <div id="appbar-logo" >
                    <Link Link to={'/'}>
                        <img src={logo} id='logo' alt="appbar-logo"/>
                    </Link>
                </div>

                <form id='searchArea'>
                    <input type="search" id="searchBox" placeholder="Enter keywords here ..." value={this.state.searchText} onChange={event => this.handleInputChange(event)}/>
                    <button type="submit" id="searchButton" onClick={(event) => this.setSearchClicked(event)}>
                        Search
                        {/*<Link to={'/search'} className="searchBoxLink">
                            Search
                        </Link>*/}
                    </button>
                    {/*{this.state.searchClicked ? <Navigate to='/defaultsearch'/> : null}*/}
                </form>

                <div className="navigationMenu">
                    <nav>
                        <div>
                            <ul>
                                <li>
                                    <Link Link to={'/createpost'}>
                                    <Button variant="outlined">Donate Now</Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link Link to={'/wishlist'}>
                                    <Button variant="outlined">Wish List</Button>
                                    </Link>
                                </li>
                                <li>
                                    <Link Link to={'/userpage'}>
                                    <Button variant="outlined">My Profile</Button>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                {this.state.searchClicked ? <DefaultSearchPage
                searchText = {this.state.searchText}
                searchClicked = {this.state.searchClicked}
                /> : null}
                {(this.state.searchClicked) && (window.location.pathname !== "/search") ? <Navigate to='/search'/> : null}
                {/*{this.state.searchClicked ? <Navigate to='/search'/> : null}
                {this.navigateToSearch}*/}
                
                {/*<Logo/>
                <SearchBox/>
                <NavigationMenu/>*/}
            </div>
        );
    }

}

export default AppBar;

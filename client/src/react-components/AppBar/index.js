import React from "react";
import logo from '../../logo.png';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import "./styles.css";
import SearchPage from '../SearchPage';
import DefaultSearchPage from '../DefaultSearchPage';
// Logo, SearchBox, and NavigationMenu are not used

class AppBar extends React.Component {

    state = {
        searchText: "",
        searchClicked: false,
        navigateFromSearchPage: false,
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
          navigateFromSearchPage: false,
        }, () => console.log(this.state))
    }

    setNavigateFromSearchPage = (event) => {
        event.preventDefault();
        this.setState({
            navigateFromSearchPage: true,
        }, () => console.log(this.state))
    }

    /*navigateToSearch = () => {
        var actions = []
        if (this.state.navigateFromSearchPage === false) {
            if (this.state.searchClicked) {
                actions.push(<SearchPage
                    searchText = {this.state.searchText}
                    searchClicked = {this.state.searchClicked}/>)
            } else {
                actions.push(<DefaultSearchPage
                    searchText = {this.state.searchText}
                    searchClicked = {this.state.searchClicked}/>)
            }            
        } else {
            actions.push(null)
        }
        return actions
    }*/

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
                        <Link to={'/search'} className="searchBoxLink">
                            Search
                        </Link>
                    </button>
                    {/*{this.state.searchClicked ? <Navigate to='/defaultsearch'/> : null}*/}
                </form>

                <div className="navigationMenu">
                    <nav>
                        <div>
                            <ul>
                                <li>
                                    <Button variant="outlined" /*onClick={(event) => this.setNavigateFromSearchPage(event)}*/>
                                        <Link Link to={'/createpost'}>
                                            Donate Now
                                        </Link>
                                    </Button>
                                </li>
                                <li>
                                    <Button variant="outlined" /*onClick={(event) => this.setNavigateFromSearchPage(event)}*/>
                                        <Link Link to={'/wishlist'}>
                                            Wish List
                                        </Link>
                                    </Button>
                                </li>
                                <li>
                                    <Button variant="outlined" /*onClick={(event) => this.setNavigateFromSearchPage(event)}*/>
                                        <Link Link to={'/userpage'}>
                                            My Profile
                                        </Link>
                                    </Button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                {/*{this.navigateToSearch()}*/}

                {this.state.searchClicked ? <SearchPage
                searchText = {this.state.searchText}
                searchClicked = {this.state.searchClicked}
                /> : null}

                {/*{this.state.navigateFromSearchPage ? null : this.state.searchClicked ? <SearchPage
                searchText = {this.state.searchText}
                searchClicked = {this.state.searchClicked}
                /> : <DefaultSearchPage
                searchText = {this.state.searchText}
                searchClicked = {this.state.searchClicked}
                />}*/}

                {/*{(this.state.searchClicked) && (window.location.pathname !== "/searchpage") ? <Navigate to='/searchpage'/> : null}*/}
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

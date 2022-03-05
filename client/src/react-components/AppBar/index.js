import React from "react";
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import "./styles.css";
import DefaultSearchPage from '../DefaultSearchPage';
// Logo, SearchBox, and NavigationMenu are not used

class AppBar extends React.Component {

    state = {
        searchText: "",
        searchClicked: false,
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
                <DefaultSearchPage/>
                {/*<Logo/>
                <SearchBox/>
                <NavigationMenu/>*/}
            </div>
        );
    }

}

export default AppBar;

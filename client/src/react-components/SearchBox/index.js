import React from "react";
import "./styles.css";
import { Navigate } from 'react-router-dom';

class SearchBox extends React.Component {

    state = {
      searchText: "",
      searchClicked: false,
    };

    handleInputChange(event) {
      this.setState({
        searchText: event.target.value
      }, () => console.log(this.state))
  }

    setSearchClicked = (event) => {
      event.preventDefault();
      this.setState({
        searchClicked: true
      }, () => console.log(this.state))
    }

    render() {
      return (
        <form id='searchArea'>
            <input type="search" id="searchBox" placeholder="Enter keywords here ..." value={this.state.searchText} onChange={event => this.handleInputChange(event)}/>
            <button type="submit" id="searchButton" onClick={(event) => this.setSearchClicked(event)}>Search</button>
            {this.state.searchClicked ? <Navigate to='/defaultsearch'/> : null}
        </form>
      );
    }
  }


export default SearchBox;
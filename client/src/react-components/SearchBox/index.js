import React from "react";
import "./styles.css";
import { Link } from 'react-router-dom';

class SearchBox extends React.Component {

    state = {
      searchText: "",
    };

    handleInputChange(event) {
      this.setState({
        searchText: event.target.value,
      }, () => console.log(this.state))
    }
    
    render() {
      return (
        <form id='searchArea'>
            <input type="search" id="searchBox" placeholder="Enter keywords here ..." value={this.state.searchText} onChange={event => this.handleInputChange(event)}/>
            <Link to={`/search?keyword=${this.state.searchText}`} className="searchBox">
              <button type="submit" id="searchButton" onClick={this.props.handleSearchButtonOnClick}>
                SEARCH
              </button>
            </Link>
        </form>
      );
    }
  }


export default SearchBox;
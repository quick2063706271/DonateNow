import React from "react";
import "./styles.css";

class SearchBox extends React.Component {
    render() {
      return (
        <form id='searchArea'>
            <input type="search" id="searchBox" placeholder="Enter keywords here ..."/>
            <button type="submit" id="searchButton">
                            Search
            </button>
        </form>
      );
    }
  }


export default SearchBox;
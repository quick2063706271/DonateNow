import React from "react";
import "./styles.css";

class SearchBox extends React.Component {
    render() {
      return (
        <div className="searchBox">
            <input placeholder="Enter keywords here ..."/>
        </div>
      );
    }
  }


export default SearchBox;
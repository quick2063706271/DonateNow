import AppBar from "../AppBar";
import React from "react";
import "./styles.css";
import StickyFooter from "../StickyFooter";


class SearchPage extends React.Component {
    render() {
        return (
            <div>
                <AppBar/>

                <StickyFooter/>
            </div>
        );
    }

}

export default SearchPage;

import React from "react";
import "./styles.css";
import NavigationMenu from "../NavigationMenu";
import SearchBox from "../SearchBox";
import Logo from "../Logo";

class AppBar extends React.Component {
    render() {
        return (
            <div>
                <div id="app-bar">
                    <Logo/>
                    <SearchBox handleSearchButtonOnClick={this.props.handleSearchButtonOnClick}/>
                    <NavigationMenu/>
                </div>
            </div>
            
        );
    }

}

export default AppBar;

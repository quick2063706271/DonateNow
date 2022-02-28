import React from "react";
import NavigationMenu from "../NavigationMenu";
import Logo from "../Logo";
import SearchBox from "../SearchBox";

import "./styles.css";

class AppBar extends React.Component {
    render() {
        return (
            <div>
                <Logo/>
                <SearchBox/>
                <NavigationMenu/>
            </div>
        );
    }

}

export default AppBar;
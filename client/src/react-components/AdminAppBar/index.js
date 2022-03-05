import React from "react";
import AdminNavigation from "../AdminNavigation";
import Logo from "../Logo";
import SearchBox from "../SearchBox";

import "./styles.css";

class AdminAppBar extends React.Component {
    render() {
        return (
            <div>
                <Logo/>
                <SearchBox/>
                <AdminNavigation/>
            </div>
        );
    }

}

export default AdminAppBar;

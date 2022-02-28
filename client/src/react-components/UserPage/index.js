import React from "react";
import "./styles.css";
import PersonalInformation from "../PersonalInformation";
import NavigationMenu from "../NavigationMenu";
import HistoryItem from "../HistoryItem";
import SideMenu from "../SideMenu";
import AppBar from "../AppBar";

class UserPage extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedPanel: 0
        }
    }

    render() {
        return (
            <div>
                <AppBar/>
                <SideMenu/>
                <PersonalInformation/>
                {/* <HistoryItem/> */}
            </div>
        );
    }

}

export default UserPage;
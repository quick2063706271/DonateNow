import React from "react";
import "./styles.css";
import PersonalInformation from "../PersonalInformation";
import NavigationMenu from "../NavigationMenu";
import HistoryItem from "../HistoryItem";
import Feedback from "../Feedback";
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
            <div className="grid-container">
                <div className="grid-item grid-item-1">
                    <AppBar />
                </div>
                <div className="grid-item grid-item-2">
                    <SideMenu className="grid-item grid-item-2" readibility={true}/>
                </div>
                
            </div>
        );
    }

}

export default UserPage;
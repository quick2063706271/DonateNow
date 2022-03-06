import React from "react";
import "./styles.css";
import PersonalInformation from "../PersonalInformation";
import NavigationMenu from "../NavigationMenu";
import HistoryItem from "../HistoryItem";
import Feedback from "../Feedback";
import SideMenu from "../SideMenu";
import AppBar from "../AppBar";
import StickyFooter from "../StickyFooter";
import { useParams } from "react-router-dom"


class UserPage extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedPanel: 0
        }
    }


    render() {
        const {userId} = this.props
        
        return (
            <div className="grid-container">
                <div className="grid-item grid-item-1">
                    <AppBar />
                </div>
                
                <div className="grid-item grid-item-2">
                    <SideMenu className="grid-item grid-item-2" userId={userId} readibility={false}/>
                </div>

                <StickyFooter/>
            </div>
        );
    }

}

export default UserPage;

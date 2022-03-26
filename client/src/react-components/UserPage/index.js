import React from "react";
import "./styles.css";
import PersonalInformation from "../PersonalInformation";
import NavigationMenu from "../NavigationMenu";
import HistoryItem from "../HistoryItem";
import Feedback from "../Feedback";
import SideMenu from "../SideMenu";
import AppBar from "../AppBar";
import StickyFooter from "../StickyFooter";

import ComponentParamsWrapper from "../ParamsWrapper";

class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedPanel: 0
        }
    }

    getUserId = () => {
        console.log("this.props.params.userId")
        console.log(this.props)
        console.log(this.props.userId)
        console.log(this.props.params.userId !== undefined)
        return this.props.params.userId || this.props.userId;
    }

    render() {
        if (this.getUserId() > -1) {
            return (
                <div className="grid-container">
                    <div className="grid-item grid-item-1">
                        <AppBar handleSearchButtonOnClick={this.props.handleSearchButtonOnClick}/>
                    </div>
                    
                    <div className="grid-item grid-item-2" id="side-menu-container">
                        <SideMenu className="grid-item grid-item-2" 
                                   userId={this.getUserId()} 
                                   readibility={this.props.params.userId !== undefined}/>
                    </div>

                    <StickyFooter/>
                </div>
            );
        } else {
            return (<h1>Please log in to view this page.</h1>);
        }
    }

}

export default ComponentParamsWrapper(UserPage);

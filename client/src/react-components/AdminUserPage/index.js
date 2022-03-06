
import React from "react";
import "./styles.css";
import PersonalInformation from "../PersonalInformation";
import AdminNavigation from "../AdminNavigation";
import HistoryItem from "../HistoryItem";
import Feedback from "../Feedback";
import AdminSideMenu from "../AdminSideMenu";
import AdminAppBar from "../AdminAppBar";
import StickyFooter from "../StickyFooter";

class AdminUserPage extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedPanel: 0
        }
    }

    render() {
        return (
            /*<div>
                <AdminAppBar/>

                <div>
                    <AdminSideMenu/>
                </div>

                <StickyFooter/>
            </div>*/

            <div className="grid-container">
                <div className="grid-item grid-item-1">
                    <AdminAppBar />
                </div>

                <div className="grid-item grid-item-2">
                    <AdminSideMenu className="grid-item grid-item-2" readibility={false}/>
                </div>

                <StickyFooter/>
            </div>
        );
    }

}

export default AdminUserPage;

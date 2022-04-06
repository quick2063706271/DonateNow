
import React from "react";
import "./styles.css";
import AdminSideMenu from "../AdminSideMenu";
import AdminAppBar from "../AdminAppBar";
import StickyFooter from "../StickyFooter";

import ComponentParamsWrapper from "../ParamsWrapper";

class AdminUserPage extends React.Component {
    constructor() {
        super()
        this.state = {
            selectedPanel: 0
        }
    }

    getUserId = () => {
        console.log("this.props.params")
        console.log(this.props)
        console.log(this.props.userId)
        console.log(this.props.params.userId !== undefined)
        return this.props.params.userId || this.props.userId;
    }

    render() {
        return (

            <div className="grid-container">
                <div className="grid-item grid-item-1">
                    <AdminAppBar handleSearchButtonOnClick={this.props.handleSearchButtonOnClick}/>
                </div>

                <div className="grid-item grid-item-2">
                    <AdminSideMenu className="grid-item grid-item-2" userId={this.getUserId()} readibility={this.props.params.userId !== undefined}/>
                </div>

                <StickyFooter/>
            </div>
        );
    }

}

export default ComponentParamsWrapper(AdminUserPage);

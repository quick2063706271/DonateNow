import React from "react";
import "./styles.css";
import SideMenu from "../SideMenu";
import AppBar from "../AppBar";
import AdminAppBar from "../AdminAppBar";
import StickyFooter from "../StickyFooter";
import { checkSession } from "../../actions/user";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

import ComponentParamsWrapper from "../ParamsWrapper";

class UserPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            admin: false
        }
    }
    componentDidMount() {
        console.log("here")
        checkSession(this); // sees if a user is logged in
    }

    getUserId = () => {
        console.log("this.props.params.userId")
        console.log(this.state)
        console.log(this.props.params.userId !== undefined)
        return this.props.params.userId || this.state.userId;
    }

    render() {
        if (this.getUserId() !== "") {
            return (
                <div className="grid-container">
                    <div className="grid-item grid-item-1">
                        {this.state.userId === "" ? 
                            <AppBar handleSearchButtonOnClick={this.handleSearchButtonOnClick}/>
                            :null
                        }
                        {this.state.userId !== "" && this.state.admin ? 
                            <AdminAppBar handleSearchButtonOnClick={this.handleSearchButtonOnClick}/>
                            :null
                        }
                        {this.state.userId !== "" && !this.state.admin ?
                            <AppBar handleSearchButtonOnClick={this.handleSearchButtonOnClick}/>
                            :null
                        }
                    </div>
                    
                    <div className="grid-item grid-item-2" id="side-menu-container">
                        <SideMenu className="grid-item grid-item-2" 
                                   userId={this.getUserId()} 
                                   readibility={this.props.params.userId !== undefined}
                                   />
                    </div>

                    <StickyFooter/>
                </div>
            );
        } else {
            return (
                <div>
                <h1>Please log in to view this page :(</h1>
                <Link to={'/login'}>
                    <Button variant="outlined" >Log In Here</Button>
                </Link>
            </div>);
        }
    }

}

export default ComponentParamsWrapper(UserPage);

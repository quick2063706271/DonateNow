import React from 'react';
import "./styles.css";
import { Button } from '@mui/material';
import PersonalInformation from '../PersonalInformation';
import Feedback from '../Feedback';
import History from '../History';
import { getUser } from '../../actions/user';
import { getOtherUser } from '../../actions/user';
import { checkSession } from '../../actions/user';
import ComponentParamsWrapper from "../ParamsWrapper";

class SideMenu extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            selectedPanel: 0,
            username: "",
            password: "",
            dateOfBirth: "",
            gender: "",
            address1: "",
            address2: "",
            phone: "",
            email: "",
            preference: "",
            bio: "",
            complaintNum: "",
            accountBlocked: "",
            isRead: "{isRead}",
            userId: this.props.userId,
            admin: false,
            personalInfo: null
        }
        console.log(this.state)

    }
    fetchPersonalInformation = () => {
        getUser(this)
    }

    fetchOtherUserInformation = () => {

        getOtherUser(this)
    }


    componentDidMount() {
        checkSession(this); // sees if a user is logged in
        if (this.props.isRead) {
            this.setState({
                userId: this.props.params.userId
            }, this.fetchOtherUserInformation)
            console.log(this.state)
        } else {
            this.setState(this.fetchPersonalInformation)
        }
    }

    handleClick = (event) => {
        console.log(event.target.innerText)
        let panel = 0
        if (event.target.innerText === 'USER INFORMATION') {
            panel = 0
        } else if (event.target.innerText === 'TRANSACTION HISTORY') {
            panel = 1
        } else if (event.target.innerText === "DONATED HISTORY") {
            panel = 2
        } else {
            panel = 3
        }
        this.setState({
            selectedPanel: panel
        })
    }

    render () {
        // check if it is reading other users
        console.log(this.state)
        let isRead = false;
        const {readibility } = this.props;
        if (readibility === true) {
            isRead = true;
        }
        // select panel to display
        let panel
        if (isRead && !this.state.admin) {
            panel = <PersonalInformation
                        userId={this.state.userId}
                        username={this.state.username}
                        password=""
                        dateOfBirth={this.state.dateOfBirth}
                        gender={this.state.gender}
                        address1={this.state.address1}
                        address2={this.state.address2}
                        phone={this.state.phone}
                        email={this.state.email}
                        preference={this.state.preference}
                        bio={this.state.bio}
                        complaintNum={this.state.complaintNum}
                        admin = {this.state.admin}
                        isRead = {isRead}/>
        } else {
            if (this.state.selectedPanel === 1) {
                panel = <History userId={this.props.userId} 
                                 category="transaction"/>
            } else if (this.state.selectedPanel === 2) {
                panel = <History userId={this.props.userId}
                                 category="donation"/>
            } else if (this.state.selectedPanel === 3) {
                panel = <Feedback/>
            } else {
                panel = <PersonalInformation
                            userId={this.state.userId}
                            username={this.state.username}
                            password=""
                            dateOfBirth={this.state.dateOfBirth}
                            gender={this.state.gender}
                            address1={this.state.address1}
                            address2={this.state.address2}
                            phone={this.state.phone}
                            email={this.state.email}
                            preference={this.state.preference}
                            bio={this.state.bio}
                            complaintNum={this.state.complaintNum}
                            admin = {this.state.admin}
                            isRead = {isRead}
                        />
            }   
        }

        return (
            <div className="side-menu-and-panel-container">
                <div className="side-menu-and-panel grid-item-1">
                    <div className="side-menu-one">
                        <div className="side-menu-container">
                            <Button variant={this.state.selectedPanel === 0 ? "contained" : "text"} onClick={this.handleClick} size="large" style={{
                                            backgroundColor: this.state.selectedPanel === 0 ? "#C65D7B" : "transparent",
                                            color: this.state.selectedPanel === 0 ? "white" : "#524A4E"
                                        }}>USER INFORMATION</Button>
                            {isRead === false &&
                                <Button variant={this.state.selectedPanel === 1 ? "contained" : "text"} onClick={this.handleClick} size="large" style={{
                                    backgroundColor: this.state.selectedPanel === 1 ? "#C65D7B" : "transparent",
                                    color: this.state.selectedPanel === 1 ? "white" : "#524A4E"
                                }}>TRANSACTION HISTORY</Button>
                            }
                            {isRead === false &&
                                <Button variant={this.state.selectedPanel === 2 ? "contained" : "text"} onClick={this.handleClick} size="large" style={{
                                    backgroundColor: this.state.selectedPanel === 2 ? "#C65D7B" : "transparent",
                                    color: this.state.selectedPanel === 2 ? "white" : "#524A4E"
                                }}>DONATED HISTORY</Button>
                            }
                            {isRead === false &&
                                <Button variant={this.state.selectedPanel === 3 ? "contained" : "text"} onClick={this.handleClick} size="large" style={{
                                    backgroundColor: this.state.selectedPanel === 3 ? "#C65D7B" : "transparent",
                                    color: this.state.selectedPanel === 3 ? "white" : "#524A4E"
                                }}>SUBMIT FEEDBACK</Button>
                            }
                        </div>
                    </div>
                </div>
                <div className="side-menu-and-panel grid-item-2">
                    {panel}
                </div>
            </div>
          )
    }

}



export default ComponentParamsWrapper(SideMenu);

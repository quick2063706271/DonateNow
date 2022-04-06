import React from 'react';
import "./styles.css";
import { Button } from '@mui/material';
import PersonalInformation from '../PersonalInformation';
import History from '../History';
import database from "../../database"

class AdminSideMenu extends React.Component{
    constructor() {
        super();
        this.state = {
            selectedPanel: 0,
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
        /*// check if it is reading other users
        let isRead = false;
        const {readibility} = this.props;
        if (readibility === true) {
            isRead = true;
        }*/

        // select user to display
        let user = database.users[0]

        // find transaction history
        let transactionHistories = database.transactions.filter((transaction) => transaction.viewerId === user.userId)

        const mergeById = (a1, a2) =>
         a1.map(itm => ({
            ...a2.find((item) => (item.postId === itm.postId) && item),
            ...itm
        }));

        let transactionPosts = mergeById(transactionHistories, database.posts);
        const uniqueTransactionPosts = [...new Map(transactionPosts.map((item, postId) => [item[postId], item])).values()]

        console.log(transactionHistories)
        console.log(transactionPosts)
        // find donation history
        let donationHistories = database.transactions.filter((transaction) => transaction.ownerId === user.userId)

        let donationPosts = mergeById(donationHistories, database.posts);

        const uniqueDonationPosts = [...new Map(donationPosts.map((item, postId) => [item[postId], item])).values()]
        // console.log(unique)
        console.log(donationPosts)

        // select panel to display
        let panel
        if (this.state.selectedPanel === 1) {
            panel = <History items={uniqueTransactionPosts} category="transaction"/>
        } else if (this.state.selectedPanel === 2) {
            panel = <History items={uniqueDonationPosts} category="donation"/>
        }
        /* else if (this.state.selectedPanel == 3) {
            panel = <Feedback/>
        } */
        else {
            panel = <PersonalInformation
                        username={user.username}
                        password={user.password}
                        dateOfBirth={user.dateOfBirth}
                        gender={user.gender}
                        address1={user.address1}
                        address2={user.address2}
                        phone={user.phone}
                        email={user.email}
                        preference={user.preference}
                        bio={user.bio}
                        complaintNum={user.complaintNum}
                        accountBlocked={user.accountBlocked}
                        admin = {true}
                    />
        }

        return (
            /*<div>
                <div className="side-menu">
                    <div className="side-menu-container">*/
        <div className="side-menu-and-panel-container">
            <div className="side-menu-and-panel grid-item-1">
                <div className="side-menu-one">
                    <div className="side-menu-container">
                        <Button variant={this.state.selectedPanel === 0 ? "contained" : "text"} onClick={this.handleClick} size="large">USER INFORMATION</Button>
                        <Button variant={this.state.selectedPanel === 1 ? "contained" : "text"} onClick={this.handleClick} size="large">TRANSACTION HISTORY</Button>
                        <Button variant={this.state.selectedPanel === 2 ? "contained" : "text"} onClick={this.handleClick} size="large">DONATED HISTORY</Button>
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



export default (AdminSideMenu);

import React from "react";
import "./styles.css";
import database from '../../database'
import AdminAppBar from "../AdminAppBar";
import { uid } from "react-uid";
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import StickyFooter from "../StickyFooter";

class AdminFeedback extends React.Component {

    constructor() {
        super()
        this.state = {
            feedbacks: {},
            redirect: false,
            redirectUserId: -1
        }
    }

    initStateInfo = () =>{
        this.setState({
            feedbacks: database.feedbacks,
          }, () => console.log(this.state))
    }

    componentDidMount() {
        this.initStateInfo();
    }

    handlePostOnClick = (value) => {
        this.setState({
            redirectUserId: value.userId
        }, () => {
            this.setState({
                redirect: true
            })
        }, () => console.log(this.state))
    }

    loopThroughFeedbacks = () => {
        const components = []
        for (const [key, value] of Object.entries(this.state.feedbacks)) {
            //for (const [k, v] of Object.entries(value)) {
                components.push (
                    <div>
                        <div className="block">
                            <a className="title"><b><u>{value.title}</u></b></a>
                            <div className="post">
                                <div className="summary">
                                    <ul>
                                        <li><b>Feedback ID: </b>{value.feedbackId}</li>
                                        <li onClick={this.handlePostOnClick.bind(this, value)}><b>User ID: </b><u>{value.userId}</u></li>
                                    </ul>
                                    <ul>
                                        <li><b>Content: </b>{value.content}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            //}
        }
        return components;
    }

    render() {
        return (
            <div>
                {this.state.redirect ? <Navigate to={`/userpage/${this.state.redirectUserId}`}/> : null}
                <AdminAppBar/>

                <div className="feedback">
                    <div className="header">
                        <h1><b>View Feedback</b></h1>
                    </div>

                    {this.loopThroughFeedbacks()}

                </div>

                <div>
                    <StickyFooter/>
                </div>
            </div>
        );
    }

}

export default AdminFeedback;

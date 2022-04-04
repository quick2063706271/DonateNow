import React from "react";
import "./styles.css";
// import monitorImg from "./monitor.png"
import { Button } from "@mui/material";
import ChooseDonee from "../ChooseDonee";
import { checkSession } from "../../actions/user";
import { changeOwnerStatus } from "../../actions/post";
import { changeViewerStatus } from "../../actions/post";
import { Navigate } from "react-router-dom";

class HistoryItem extends React.Component{
    constructor() {
        super()
        this.state = {
            userId: -1,
            admin: false,
            redirect: false
        }
    }
    componentDidMount() {
        checkSession(this); // sees if a user is logged in
    }
    handlePostOnClick = () => {

        this.setState({
            redirect: true
        })

    }
    render() {
        // status: {Received, Requested, Accepted, Pending, Failed, Posted, Order Placed, Completed}
        console.log("in history item")
        const { header, ownerStatus, date, img, postId, category, viewers } = this.props;
        console.log(this.props)
        let chooseDoneeButton
        if (ownerStatus === "Posted" && category === "donation") {
            chooseDoneeButton = <div> 
                                    {/* <ChooseDonee /> */}
                                    <ChooseDonee class="" btnId="" 
                                    userId={this.props.userId}  postId={this.props.postId}/>
                                </div>
        } else {
            chooseDoneeButton = null
        }
        let failButtonDonor
        let successButtonDonor
        if (ownerStatus === "Donation Matched" && category === "donation") {
            failButtonDonor = <div>
                            <Button id="failButton"
                                    onClick={ () => changeOwnerStatus(this.props.postId, "Failed")}
                                    >Failed</Button>
                         </div>
            successButtonDonor = <div>
                            <Button id="failButton"
                                    onClick={ () => changeOwnerStatus(this.props.postId, "Completed")}
                                    >Completed</Button>
         </div>
        } else {
            failButtonDonor = null
            successButtonDonor = null
        }

        
        
        console.log(this.state)
        console.log(viewers)
        console.log(viewers.filter(viewer => {return viewer.viewerId===this.state.userId  }))

        let failButtonDonee
        let successButtonDonee

        let viewer = viewers.filter(viewer => {return viewer.viewerId===this.state.userId  })
        let viewerStatusHere = ""
        if (viewer.length > 0) {
            viewerStatusHere = viewer[0].viewerStatus
        }

        if (viewerStatusHere === "Request Accepted" && category === "transaction") {
            failButtonDonee = <div>
                            <Button id="failButton"
                                    onClick={ () => changeViewerStatus(this.props.postId, this.state.userId, "Failed")}
                                    >Failed</Button>
                         </div>
            successButtonDonee = <div>
                            <Button id="failButton"
                                    onClick={ () => changeViewerStatus(this.props.postId, this.state.userId, "Completed")}
                                    >Success</Button>
         </div>
        } else {
            failButtonDonee = null
            successButtonDonee = null
        }
        console.log(viewerStatusHere)
        return (
            <div id="item-card">
                {this.state.redirect ? <Navigate to={`/postpage/${this.props.postId}`}/> : null}
                <div id="img-container">
                    <img src={img} className="item-img" alt="img"/>
                </div>
                <div id="item-information-container">
                    <h2 id="item-header" onClick={this.handlePostOnClick}>{header}</h2>
                    <h4>
                        Status: { 
                            category === "donation" ? ownerStatus :
                            viewerStatusHere
                        }
                    </h4>
                    {/* <h3>{date}</h3> */}
                    {chooseDoneeButton}
                    <div className="button-group">
                        {failButtonDonor}
                        {successButtonDonor}
                    </div>
                    <div className="button-group">
                        {failButtonDonee}
                        {successButtonDonee}
                    </div>
                </div>
            </div>      
        )
    }
}
export default HistoryItem;
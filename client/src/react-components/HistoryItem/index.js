import React from "react";
import "./styles.css";
import { Button } from "@mui/material";
import ChooseDonee from "../ChooseDonee";
import { checkSession } from "../../actions/user";
import { changeOwnerStatus } from "../../actions/post";
import { changeViewerStatus } from "../../actions/post";
import { Navigate } from "react-router-dom";
import ViewDonorAndDonee from "../ViewDonorAndDonee"


class HistoryItem extends React.Component{
    constructor() {
        super()
        this.state = {
            userId: -1,
            admin: false,
            redirect: false,
            open: false,
            viewers: null
            
        }
    }
    componentDidMount() {
        checkSession(this); // sees if a user is logged in
        this.setState({viewers: this.props.viewers})
        console.log(this.state)
    }
    handlePostOnClick = () => {

        this.setState({
            redirect: true
        })

    }
    render() {
        // status: {Received, Requested, Accepted, Pending, Failed, Posted, Order Placed, Completed}
        console.log("in history item")

        const { header, ownerStatus, img, category, viewers } = this.props;
        console.log(this.props)
        let chooseDoneeButton
        if (ownerStatus === "Posted" && category === "donation") {
            chooseDoneeButton = <div> 
                                    <ChooseDonee class="" btnId="" 
                                    userId={this.props.userId}  postId={this.props.postId}/>
                                </div>
        } else {
            chooseDoneeButton = null
        }
        console.log(this.state)
        let viewer = this.props.viewers.filter(viewer => {return viewer.viewerId===this.state.userId  })
        let viewerStatusHere = ""
        if (viewer.length > 0) {
            viewerStatusHere = viewer[0].viewerStatus
        }
        console.log(viewer)
        let failButtonDonor
        let successButtonDonor
        let viewDoneeButton = null
        if (ownerStatus === "Donation Matched" && category === "donation") {
            failButtonDonor = <div>
                            <Button id="failCompleteButtonInHistory" size="small"
                                    onClick={ () => changeOwnerStatus(this.props.postId, "Failed")}
                                    >Failed</Button>
                         </div>
            successButtonDonor = <div>
                            <Button id="failCompleteButtonInHistory" size="small"
                                    onClick={ () => changeOwnerStatus(this.props.postId, "Completed")}
                                    >Completed</Button>
                        </div>
            let donee = this.props.viewers.filter(viewer => {return viewer.viewerStatus==="Request Accepted"})
            if (donee.length > 0) {
                viewDoneeButton = <div>
                <ViewDonorAndDonee userId={donee[0].viewerId} type="donee"/>
                    </div>
            }
            
        } else {
            failButtonDonor = null
            successButtonDonor = null
            viewDoneeButton = null
        }

        
        
        console.log(this.state)
        console.log(viewers)
        console.log(viewers.filter(viewer => {return viewer.viewerId===this.state.userId  }))

        let failButtonDonee
        let successButtonDonee
        let viewDonorButton


        console.log(viewer[0])
        if (viewerStatusHere === "Request Accepted" && category === "transaction") {
            failButtonDonee = <div>
                            <Button id="failCompleteButtonInHistory" size="small"
                                    onClick={ () => changeViewerStatus(this.props.postId, this.state.userId, "Failed")}
                                    >Failed</Button>
                         </div>
            successButtonDonee = <div>
                            <Button id="failCompleteButtonInHistory" size="small"
                                    onClick={ () => changeViewerStatus(this.props.postId, this.state.userId, "Completed")}
                                    >Completed</Button>
                                </div>
            viewDonorButton = <div>
                            <ViewDonorAndDonee userId={this.props.ownerId} type="donor"/>
                            </div>
        } else {
            failButtonDonee = null
            successButtonDonee = null
            viewDonorButton = null
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
                    {chooseDoneeButton}
                    {viewDonorButton}
                    {viewDoneeButton}
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
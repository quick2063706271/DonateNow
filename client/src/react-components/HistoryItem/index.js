import React from "react";
import "./styles.css";
// import monitorImg from "./monitor.png"
import { Button } from "@mui/material";
import ChooseDonee from "../ChooseDonee";
import { checkSession } from "../../actions/user";


class HistoryItem extends React.Component{
    constructor() {
        super()
        this.state = {
            userId: -1
        }
    }
    componentDidMount() {
        checkSession(this); // sees if a user is logged in
    }
    render() {
        // status: {Received, Requested, Accepted, Pending, Failed, Posted, Order Placed, Completed}
        console.log("in history item")
        const { header, ownerStatus, date, img, postId, category, viewers } = this.props;
        let chooseDoneeButton
        if (ownerStatus === "posted" && category === "donation") {
            chooseDoneeButton = <div > 
                                    {/* <ChooseDonee /> */}
                                    <ChooseDonee class="" btnId="" 
                                    userId={this.props.userId}  postId={this.props.postId}/>
                                </div>
        } else {
            chooseDoneeButton = <div></div>
        }
        return (
            <div id="item-card">
                <div id="img-container">
                    <img src={img} className="item-img" alt="img"/>
                </div>
                <div id="item-information-container">
                    <h2>{header}</h2>
                    <h4>
                        Status: { 
                            category === "donation" ? ownerStatus :
                            viewers.filter(viewer => viewer.viewerId === this.state.userId)[0].viewerStatus
                        }
                    </h4>
                    {/* <h3>{date}</h3> */}
                </div>
                {chooseDoneeButton}
            </div>      
        )
    }
}
export default HistoryItem;
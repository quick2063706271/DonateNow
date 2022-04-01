import React from "react";
import "./styles.css";
// import monitorImg from "./monitor.png"
import { Button } from "@mui/material";
import ChooseDonee from "../ChooseDonee";


class HistoryItem extends React.Component{
    constructor() {
        super()
    }

    render() {
        // status: {Received, Requested, Accepted, Pending, Failed, Posted, Order Placed, Completed}
        console.log("in history item")
        const { header, status, date, img, postId } = this.props;
        let chooseDoneeButton
        if (status === "posted") {
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
                    <h4>Status: {status}</h4>
                    {/* <h3>{date}</h3> */}
                </div>
                {chooseDoneeButton}
            </div>      
        )
    }
}
export default HistoryItem;
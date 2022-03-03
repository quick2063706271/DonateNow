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
        const { header, status, date, img } = this.props;
        let chooseDoneeButton
        if (status === "posted") {
            chooseDoneeButton = <div > 
                                    <ChooseDonee/>
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
                    <h1>{header}</h1>
                    <h3>{status}</h3>
                    {/* <h3>{date}</h3> */}
                </div>
                {chooseDoneeButton}
            </div>      
        )
    }
}
export default HistoryItem;
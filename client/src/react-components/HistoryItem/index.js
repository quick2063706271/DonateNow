import React from "react";
import "./styles.css";
import monitorImg from "../../monitor.png"


class HistoryItem extends React.Component{
    constructor() {
        super()
    }

    render() {
        // status: {Received, Requested, Accepted, Pending, Failed, Posted, Order Placed, Completed}
        const { header, status, date, img } = this.props;
        return (
            <div id="item-card">
                <div id="img-container">
                    <img src={img} className="item-img" alt="img"/>
                </div>
                <div id="item-information-container">
                    <h1>{header}</h1>
                    <h3>{status}</h3>
                    <h3>{date}</h3>
                </div>
            </div>      
        )
    }
}
export default HistoryItem;
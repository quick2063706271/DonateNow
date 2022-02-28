import React from "react";
import "./styles.css";
import monitorImg from "./monitor.png"

class HistoryItem extends React.Component{
    constructor(props) {
        super(props)
    }

    render() {
        // type: {transaction, donated} 
        // status: {Received, Requested, Accepted, Pending, Failed, Posted, Order Placed, Completed}
        const { name, type, status, date } = this.props;
        return (
            <div id="item-card">
                <div id="img-container">
                    <img src={monitorImg} className="itemImage" alt="img" height="200px"/>
                </div>
                <div id="item-information-container">
                    <h1>Monitor</h1>
                    <h3>Request Accepted</h3>
                    <h3>2021-02-01</h3>
                </div>
            </div>      
        )
    }
}
export default HistoryItem;
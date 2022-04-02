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
            userId: -1,
            admin: false
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
        console.log(this.state)
        console.log(viewers)
        console.log(viewers.filter(viewer => {return viewer.viewerId===this.state.userId  }))

        let viewer = viewers.filter(viewer => {return viewer.viewerId===this.state.userId  })
        let viewStatusHere = ""
        if (viewer.length > 0) {
            viewStatusHere = viewer[0].viewStatus
        }
        console.log(viewStatusHere)
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
                            viewStatusHere
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
import "./styles.css"
import React from "react";
import { uid } from "react-uid";
import HistoryItem from "../HistoryItem";
import { getDonationHistory } from "../../actions/user";
import { checkSession } from "../../actions/user";

class History extends React.Component {
    constructor() {
        super()
        this.state = {
            donationPosts: [],
            transactedPosts: []
        }
    }

    fetchHistoryInformation = () => {
        getDonationHistory(this)
        // findPostByKeyword(this, keyword)
    }
    componentDidMount() {
        checkSession(this, this.fetchHistoryInformation()); // sees if a user is logged in
    }
    render() {
        console.log(this.state)
        const {items, category} = this.props;
        console.log(category)
        let histories
        if (this.state.donationPosts.length === 0) {
            histories = <div id="history-container"></div>
        } 
        if (category === "donation") {
            console.log("goes to condition 2")
            console.log(this.state.donationPosts)
            histories = <div id="history-container">
                            {this.state.donationPosts.map((item) => (<HistoryItem 
                                                    key={uid(item)} 
                                                    header={item.header} 
                                                    status={item.ownerStatus} 
                                                    date={item.datePosted}
                                                    img={item.imageSrc}
                                                    postId={item.postId}
                                                />)
                            )}
                        </div>
        }
        
        
        else {
            histories = <div id="history-container">
                            {items.map((item) => (<HistoryItem 
                                                    key={uid(item)} 
                                                    header={item.header} 
                                                    status={category === "transaction" ? item.viewerStatus: item.ownerStatus} 
                                                    date={item.requestDate}
                                                    img={item.imageSrc}
                                                    postId={item.postId}
                                                    userId={this.props.userId}
                                                />)
                            )}
                        </div>
        }
        return (
            histories
        )
    }
}

export default History;
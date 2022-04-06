import "./styles.css"
import React from "react";
import { uid } from "react-uid";
import HistoryItem from "../HistoryItem";
import { getDonationHistory } from "../../actions/user";
import { getTransactionHistory } from "../../actions/user";
import { checkSession } from "../../actions/user";
import { getHistoryPostsImages } from "../../actions/image";

class History extends React.Component {
    constructor() {
        super()
        this.state = {
            donationPosts: [],
            transactionPosts: [],
            images: {}
        }
    }

    fetchHistoryInformation = (callback = () => {}) => {
        getDonationHistory(this, callback)
        getTransactionHistory(this, callback)
    }

    fetchPostsImages = () => {
        getHistoryPostsImages(this)
    }

    getImageSrc = (post) => {
        if (this.state.images[post.imageSrc]) {
            return this.state.images[post.imageSrc].image_url
        }
        return ""
    }

    componentDidMount() {
        checkSession(this, ()=> {
            this.fetchHistoryInformation(this.fetchPostsImages)
        }); // sees if a user is logged in
    }
    render() {
        console.log(this.state)
        const { category } = this.props;
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
                                                    ownerId={item.ownerId}
                                                    ownerStatus={item.ownerStatus} 
                                                    date={item.datePosted}
                                                    img={this.getImageSrc(item)}
                                                    postId={item._id}
                                                    viewers={item.viewers}
                                                    category={"donation"}
                                                />)
                            )}
                        </div>
        }
        
        
        if (category === "transaction") {
            console.log("goes to condition 3")
            console.log(this.state.transactionPosts)
            histories = <div id="history-container">
                            {this.state.transactionPosts.map((item) => (<HistoryItem 
                                                    key={uid(item)} 
                                                    header={item.header}
                                                    ownerId={item.ownerId} 
                                                    ownerStatus={item.ownerStatus} 
                                                    date={item.datePosted}
                                                    img={this.getImageSrc(item)}
                                                    postId={item._id}
                                                    viewers={item.viewers}
                                                    category={"transaction"}
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
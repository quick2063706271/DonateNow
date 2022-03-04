import React from "react";
import "./styles.css";
import database from '../../database'
import AppBar from "../AppBar";

class WishList extends React.Component {

    state = {
        postId: 1,
        post: {},  
        user: {}, 
    };

    //const categories = this.state.post.categories.filter(pilot => pilot.faction === "Rebels");

    getPost = (post) => {
        return post.postId === this.state.postId;
    }

    getUser = (user) => {
        return user.userId === this.props.userId;
    }

    initStateInfo = () =>{
        this.setState({
            post: database.posts.filter(this.getPost)[0],
            user: database.users.filter(this.getUser)[0],
          }, () => console.log(this.state))
    }

    componentDidMount() {
        this.initStateInfo()
    }

    render() {
        return (
            <div>
                <AppBar/>
                <div className="wishlist">
                    <div className="header">
                        <h1><b>My Wish List:</b></h1>
                    </div>
                    <div>  
                        <div className="block">  
                            <p><b><u>{this.state.post.header}</u></b></p>
                            {/*<div>
                                <img src={this.state.post.img_src} className="logo" alt="logo"/>
                            </div>*/}

                            <ul>
                                <li><b>Categories: </b>{this.state.post.category}</li>
                                <li><b>Date Posted: </b>{this.state.post.datePosted}</li>
                            </ul>
                            <ul>
                                <li><b>Location: </b>{this.state.post.location}</li>
                                <li><b>Delivery Option: </b>{this.state.post.deliveryOption}</li>
                            </ul>
                            <br></br>
                            <ul>
                                <li><b>Views: </b>{this.state.post.views}</li>
                                <li><b>Requests: </b>{this.state.post.requests}</li>
                                <li><b>Saved: </b>{this.state.post.saved}</li>
                            </ul>
                            
                        </div>  
                    </div>
                </div>
                
            </div>
        );
    }

}

export default WishList;
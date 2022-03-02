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
                    <h1><b>My Wish List:</b></h1>
                    <div>  
                        <div className="block">  
                            <p><b><u>{this.state.post.header}</u></b></p>
                            <div>
                                <img src={this.state.post.img_src} className="logo" alt="logo"/>
                            </div>
                            
                            {/*<p><b>Categories: </b>{this.state.post.categories.filter(this.getCategory)[0]}</p>
                            <p><b>Delivery Option: </b>{this.state.post.delivery_option}</p> */}
                            <p><b>Location: </b>{this.state.post.location}</p>
                            
                            <span><b>Views: </b>{this.state.post.views}</span>
                            <span><b>Requests: </b>{this.state.post.Requests}</span>
                            <span><b>Saved: </b>{this.state.post.Saved}</span>
                            
                        </div>  
                    </div>
                </div>
                
            </div>
        );
    }

}

export default WishList;
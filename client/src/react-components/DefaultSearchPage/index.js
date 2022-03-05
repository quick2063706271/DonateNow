import React from "react";
import "./styles.css";
import database from '../../database'
import AppBar from "../AppBar";
import { uid } from "react-uid";

class DefaultSearchPage extends React.Component {

    state = {
        //userId: 2,
        //user: {},
        post: {},
    };

    /*getPost = (post) => {
        const wishlisted = database.users.filter(this.getUser)[0].wishlisted;
        return wishlisted.includes(post.postId);
    }

    getUser = (user) => {
        return user.userId === this.state.userId;
    }*/

    initStateInfo = () =>{
        this.setState({
            //user: database.users.filter(this.getUser)[0],
            post: database.posts,
          }, () => console.log(this.state))
    }

    componentDidMount() {
        this.initStateInfo();
    }

    loopThroughPosts = () => {
        const components = []
        for (const [key, value] of Object.entries(this.state.post)) {
            components.push (
                <div>
                    <div className="block">
                        <p className="title"><b><u>{value.header}</u></b></p>
                        <div className="post">
                            <img src={`..${value.imageSrc}`} className="image" alt="image"/>
                            <div className="summary">
                                <ul>
                                    <li><b>Categories: </b>{value.categories.join(", ")}</li>
                                    <li><b>Date Posted: </b>{value.datePosted}</li>
                                </ul>
                                <ul>
                                    <li><b>Location: </b>{value.location}</li>
                                    <li><b>Delivery Option: </b>{value.deliveryOption}</li>
                                </ul>
                                <br></br>
                                <ul>
                                    <li><b>Views: </b>{value.views}</li>
                                    <li><b>Requests: </b>{value.requests}</li>
                                    <li><b>Saved: </b>{value.saved}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        return components;
    }

    render() {
        return (
            <div>
                <AppBar/>
                <div className="defaultSearchPage">
                    <div className="header">
                        <h1><b>Search: </b></h1>
                    </div>

                    {this.loopThroughPosts()}

                </div>

            </div>
        );
    }

}

export default DefaultSearchPage;

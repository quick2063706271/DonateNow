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
                    {/*<div className="filter">
                        <h1>Filter by</h1>
                    </div>*/}
                    <div className="filterbar">
                        <h1 className="filter">Filter by</h1>
                        <div class="dropdown">
                            <button class="button">Categories</button>
                            <div class="dropdown-content">
                                <a href="#">Toys</a>
                                <a href="#">Children</a>
                                <a href="#">Parents</a>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="button">Location</button>
                            <div class="dropdown-content">
                                <a href="#">Toronto</a>
                                <a href="#">Montreal</a>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="button">Distance</button>
                            <div class="dropdown-content">
                                <a href="#">5km</a>
                                <a href="#">10km</a>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="button">Delivery Option</button>
                            <div class="dropdown-content">
                                <a href="#">Pickup</a>
                                <a href="#">By Courier</a>
                            </div>
                        </div>
                        <div class="dropdown">
                            <button class="button">Date Posted</button>
                            <div class="dropdown-content">
                                <a href="#">February</a>
                                <a href="#">March</a>
                            </div>
                        </div>
                    </div>
                    <div className="header">
                        <h1><b>Search Results: </b></h1>
                    </div>

                    {this.loopThroughPosts()}

                </div>

            </div>
        );
    }

}

export default DefaultSearchPage;

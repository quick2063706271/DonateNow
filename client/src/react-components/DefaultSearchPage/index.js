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
        categoryBtnText: "Category",
        locationBtnText: "Location",
        deliveryOptionBtnText: "Delivery Option",
    };

    getDropdownContent = (drpdwn) => {
        const options = []
        if (drpdwn === "categories") {
            const cats = database.categories
            for (var i = 0; i < cats.length; i++) {
                options.push(<a href="#" name={cats[i]} onClick={(event) => this.changeDrpdwnBtnValue(event, "category")}>{cats[i]}</a>)
            }
        } else if (drpdwn === "locations") {
            const locs = database.locations
            for (var i = 0; i < locs.length; i++) {
                options.push(<a href="#" name={locs[i]} onClick={(event) => this.changeDrpdwnBtnValue(event, "location")}>{locs[i]}</a>)
            }
        } else if (drpdwn === "delivery options") {
            const delivery = database.deliveryOptions
            for (var i = 0; i < delivery.length; i++) {
                options.push(<a href="#" name={delivery[i]} onClick={(event) => this.changeDrpdwnBtnValue(event, "delivery option")}>{delivery[i]}</a>)
            }
        }
        return options
    }

    changeDrpdwnBtnValue = (event, drpdwn) => {
        /*var element = document.getElementById("Toys");
        console.log(element.id);*/
        if (drpdwn === "category") {
            this.setState({
                categoryBtnText: "Category: " + event.target.name,
            }, () => console.log(this.state))
        } else if (drpdwn === "location") {
            this.setState({
                locationBtnText: "Location: " + event.target.name,
            }, () => console.log(this.state))
        } else if (drpdwn === "delivery option") {
            this.setState({
                deliveryOptionBtnText: "Delivery Option: " + event.target.name,
            }, () => console.log(this.state))
        }
    }

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
                    <div className="filterbar">
                        <h1 className="filter">Filter by</h1>
                        <div className="dropdown">
                            <button className="button">{this.state.categoryBtnText}</button>
                            <div className="dropdown-content">
                                {this.getDropdownContent("categories")}
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="button">{this.state.locationBtnText}</button>
                            <div className="dropdown-content">
                                {this.getDropdownContent("locations")}
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="button">{this.state.deliveryOptionBtnText}</button>
                            <div className="dropdown-content">
                                {this.getDropdownContent("delivery options")}
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="button">Distance</button>
                            <div className="dropdown-content">
                                <a href="#">5km</a>
                                <a href="#">10km</a>
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="button">Date Posted</button>
                            <div className="dropdown-content">
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

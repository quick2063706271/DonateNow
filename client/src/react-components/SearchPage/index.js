import AppBar from "../AppBar";
import { Navigate, useSearchParams } from "react-router-dom";
import React from 'react';
import "./styles.css";
import StickyFooter from "../StickyFooter";
import database from '../../database'
import ComponentParamsWrapper from "../ParamsWrapper";
import AdminAppBar from "../AdminAppBar";

class SearchPage extends React.Component {
    state = {
        post: [],
        categoryBtnText: "Category: All",
        categoryVal: "All",
        locationBtnText: "Location: All",
        locationVal: "All",
        deliveryOptionBtnText: "Delivery Option: All",
        deliveryOptionVal: "All",
        redirect: false,
        redirectPostId: -1
    };

    handleSearchButtonOnClick = () => {
        this.fetchPosts();
    }

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
        if (drpdwn === "category") {
            this.setState({
                categoryBtnText: "Category: " + event.target.name,
                categoryVal: event.target.name,
            }, () => this.fetchPosts())
        } else if (drpdwn === "location") {
            this.setState({
                locationBtnText: "Location: " + event.target.name,
                locationVal: event.target.name,
            }, () => this.fetchPosts())
        } else if (drpdwn === "delivery option") {
            this.setState({
                deliveryOptionBtnText: "Delivery Option: " + event.target.name,
                deliveryOptionVal: event.target.name,
            }, () => this.fetchPosts())
        }
    }

    // not used
    appliedFilter = () => {
        return (this.state.categoryVal !== "All") || (this.state.locationVal !== "All") || (this.state.deliveryOptionVal !== "All")
    }

    fetchPosts = () => {
        const keyword = this.props.query.get("keyword") || "";
        var posts = database.posts;
        if (keyword.trim() !== "") {
            posts = posts.filter(post => post.header.toLowerCase().includes(keyword.trim().toLowerCase()))
        }
        if (this.state.categoryVal !== "All") {
            posts = posts.filter(post => post.categories.some(item => this.state.categoryVal === item))
        }
        if (this.state.locationVal !== "All") {
            posts = posts.filter(post => post.location === this.state.locationVal)
        }
        if (this.state.deliveryOptionVal !== "All") {
            posts = posts.filter(post => post.deliveryOption === this.state.deliveryOptionVal)
        }

        this.setState({
            post: posts
        })
    }

    componentDidMount() {
        this.fetchPosts();
    }

    handlePostOnClick = (value) => {
        this.setState({
            redirectPostId: value.postId
        }, () => {
            this.setState({
                redirect: true
            })
        })
    }

    renderPost = (value) => {
        return (
            <div>
                <div className="block">
                    <a className="title" onClick={this.handlePostOnClick.bind(this, value)}><b><u>{value.header}</u></b></a>
                    <div className="post">
                        <img 
                            src={`..${value.imageSrc}`}
                            className="image"
                            alt="image"
                            onClick={this.handlePostOnClick.bind(this, value)}
                        />
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
        )
    }
    
    render() {
        return (
            <div>
                {this.state.redirect ? <Navigate to={`/postpage/${this.state.redirectPostId}`}/> : null}

                {this.props.userId === -1 ? 
                    <AppBar handleSearchButtonOnClick={this.handleSearchButtonOnClick}/>
                    :null
                    }
                {this.props.userId != -1 && database.getUserData(this.props.userId).admin ? 
                    <AdminAppBar handleSearchButtonOnClick={this.handleSearchButtonOnClick}/>
                    :
                    null}
                {this.props.userId != -1 && !database.getUserData(this.props.userId).admin ?
                    <AppBar handleSearchButtonOnClick={this.handleSearchButtonOnClick}/>
                    :null
                    }

                
                <div className="searchPage">
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
                    {this.state.post.map((post) => {
                        return this.renderPost(post)
                    })}
                </div>
                <StickyFooter/>
            </div>
        );
    }
}

export default ComponentParamsWrapper(SearchPage);

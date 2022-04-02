import AppBar from "../AppBar";
import { Navigate, useSearchParams } from "react-router-dom";
import React from 'react';
import "./styles.css";
import StickyFooter from "../StickyFooter";
import database from '../../database'
import ComponentParamsWrapper from "../ParamsWrapper";
import AdminAppBar from "../AdminAppBar";
import {checkSession} from "../../actions/user";
import {findPostByKeyword} from "../../actions/post"

class SearchPage extends React.Component {
    state = {
        userId: "",
        admin: false,
        posts: [],
        categoryBtnText: "Category: All",
        categoryVal: "All",
        locationBtnText: "Location: All",
        locationVal: "All",
        deliveryOptionBtnText: "Delivery Option: All",
        deliveryOptionVal: "All",
        sortDatePostedBtnText: "Sort by Date Posted: None",
        sortDatePostedVal: "None",
        sortViewsBtnText: "Sort by Views: None",
        sortViewsVal: "None",
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
        } else if (drpdwn === "sort date posted") {
            const sortDate = database.sortDatePosted
            for (var i = 0; i < sortDate.length; i++) {
                options.push(<a href="#" name={sortDate[i]} onClick={(event) => this.changeDrpdwnBtnValue(event, "sort date posted")}>{sortDate[i]}</a>)
            }
        } else if (drpdwn === "sort views") {
            const sortViews = database.sortViews
            for (var i = 0; i < sortViews.length; i++) {
                options.push(<a href="#" name={sortViews[i]} onClick={(event) => this.changeDrpdwnBtnValue(event, "sort views")}>{sortViews[i]}</a>)
            }
        }
        return options
    }

    changeDrpdwnBtnValue = (event, drpdwn) => {
        event.preventDefault();
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
        } else if (drpdwn === "sort date posted") {
            this.setState({
                sortDatePostedBtnText: "Sort by Date Posted: " + event.target.name,
                sortDatePostedVal: event.target.name,
                sortViewsBtnText: "Sort by Views: None",
                sortViewsVal: "None",
            }, () => this.fetchPosts())
        } else if (drpdwn === "sort views") {
            this.setState({
                sortViewsBtnText: "Sort by Views: " + event.target.name,
                sortViewsVal: event.target.name,
                sortDatePostedBtnText: "Sort by Date Posted: None",
                sortDatePostedVal: "None",
            }, () => this.fetchPosts())
        }
    }

    fetchPosts = () => {
        const keyword = this.props.query.get("keyword") || "";
        findPostByKeyword(this, keyword)
    }

    componentDidMount() {
        checkSession(this, this.fetchPosts());
    }

    handlePostOnClick = (post) => {
        this.setState({
            redirectPostId: post._id.toString()
        }, () => {
            this.setState({
                redirect: true
            })
        })
    }

    renderPost = (post) => {
        return (
            <div>
                <div className="block">
                    <a className="title" onClick={this.handlePostOnClick.bind(this, post)}>
                        <b><u>{post.header}</u></b>
                    </a>
                    <div className="post">
                        <img 
                            src={`..${post.imageSrc}`}
                            className="image"
                            alt="image"
                            onClick={this.handlePostOnClick.bind(this, post)}
                        />
                        <div className="summary">
                            <ul>
                                <li><b>Categories: </b>{post.categories.join(", ")}</li>
                                <li><b>Date Posted: </b>{post.datePosted}</li>
                            </ul>
                            <ul>
                                <li><b>Location: </b>{post.location}</li>
                                <li><b>Delivery Option: </b>{post.deliveryOption}</li>
                            </ul>
                            <br></br>
                            <ul>
                                <li><b>Views: </b>{post.views}</li>
                                <li><b>Requests: </b>{post.requests}</li>
                                <li><b>Saved: </b>{post.saved}</li>
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

                {this.state.userId === "" ? 
                    <AppBar handleSearchButtonOnClick={this.handleSearchButtonOnClick}/>
                    :null
                    }
                {this.state.userId != "" && this.state.admin ? 
                    <AdminAppBar handleSearchButtonOnClick={this.handleSearchButtonOnClick}/>
                    :
                    null}
                {this.state.userId != "" && !this.state.admin ?
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
                            <button className="button">{this.state.sortDatePostedBtnText}</button>
                            <div className="dropdown-content">
                                {this.getDropdownContent("sort date posted")}
                            </div>
                        </div>
                        <div className="dropdown">
                            <button className="button">{this.state.sortViewsBtnText}</button>
                            <div className="dropdown-content">
                                {this.getDropdownContent("sort views")}
                            </div>
                        </div>
                    </div>
                    <div className="header">
                        <h1><b>Search Results: </b></h1>
                    </div>
                    {this.state.posts.map((post) => {
                        return this.renderPost(post)
                    })}
                </div>
                <br></br>
                <br></br>
                <StickyFooter/>
            </div>
        );
    }
}

export default ComponentParamsWrapper(SearchPage);

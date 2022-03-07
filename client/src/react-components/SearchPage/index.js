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
        sortDatePostedBtnText: "Sort Date Posted: None",
        sortDatePostedVal: "None",
        sortViewsBtnText: "Sort Views: None",
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
                sortDatePostedBtnText: "Sort Date Posted: " + event.target.name,
                sortDatePostedVal: event.target.name,
            }, () => this.fetchPosts())
        } else if (drpdwn === "sort views") {
            this.setState({
                sortViewsBtnText: "Sort Views: " + event.target.name,
                sortViewsVal: event.target.name,
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
        if (this.state.sortDatePostedVal === "Oldest") {
            posts = this.sortPosts("Oldest")
        }
        if (this.state.sortDatePostedVal === "Newest") {
            posts = this.sortPosts("Newest")
        }
        if (this.state.sortViewsVal === "Smallest") {
            posts = this.sortPosts("Smallest")
        }
        if (this.state.sortViewsVal === "Largest") {
            posts = this.sortPosts("Largest")
        }

        this.setState({
            post: posts
        })
    }

    componentDidMount() {
        this.fetchPosts();
    }

    sortPosts = (drpdwn) => {
        var posts = database.posts
        if (drpdwn === "Oldest") {
            posts = posts.sort((a, b) => new Date(a.datePosted.split('/')) - new Date(b.datePosted.split('/')))
        } else if (drpdwn === "Newest") {
            posts = posts.sort((a, b) => new Date(a.datePosted.split('/')) - new Date(b.datePosted.split('/'))).reverse()
        } else if (drpdwn === "Smallest") {
            posts = posts.sort((a, b) => a.views > b.views ? 1 : -1)
        } else if (drpdwn === "Largest") {
            posts = posts.sort((a, b) => a.views < b.views ? 1 : -1)
        }
        return posts
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
                    {this.state.post.map((post) => {
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

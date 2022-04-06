import React from "react";
import AppBar from "../AppBar";
import "./styles.css";
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import StickyFooter from "../StickyFooter";
import { checkSession, removeWishlist } from "../../actions/user";
import { findPostByWishlisted } from "../../actions/post";
import { Link } from "react-router-dom";
import {getPostsImages} from "../../actions/image"

class WishList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            admin: false,
            posts: [],
            redirect: false,
            redirectPostId: -1,
            images: {},
        }
    }

    componentDidMount() {
        checkSession(this, () => {
            findPostByWishlisted(this, this.fetchPostsImages)
        });
    }

    handlePostOnClick = (value) => {
        this.setState({
            redirectPostId: value._id
        }, () => {
            this.setState({
                redirect: true
            })
        })
    }

    fetchPostsImages = () => {
        getPostsImages(this)
    }

    getImageSrc = (post) => {
        if (this.state.images[post.imageSrc]) {
            return this.state.images[post.imageSrc].image_url
        }
        return ""
    }

    loopThroughPosts = () => {
        const components = []
        for (const [ , value] of Object.entries(this.state.posts)) {
                components.push (
                    <div>
                        <div className="block">
                            <a className="title" onClick={this.handlePostOnClick.bind(this, value)}><b><u>{value.header}</u></b></a>
                            <Button onClick={() => removeWishlist(this.state.userId, value._id.toString(), true)} 
                                    style = {{backgroundColor: "#C65D7B", color: "white", fontSize: "16px", right: "5%", position: "absolute"}}>
                                    Remove
                            </Button>
                            <div className="post">
                                <img
                                    src={this.getImageSrc(value)}
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
                                        <li><b>Requests: </b>{value.viewers.length}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            //}
        }
        return components;
    }

    render() {
        if (this.state.userId !== "") {
            return (
                <div>
                    {this.state.redirect ? <Navigate to={`/postpage/${this.state.redirectPostId}`}/> : null}
                    <AppBar handleSearchButtonOnClick={this.props.handleSearchButtonOnClick}/>

                    <div className="wishlist">
                        <div className="header">
                            <h1><b>My Wish List:</b></h1>
                        </div>

                        {this.loopThroughPosts()}

                    </div>

                    <div>
                        <StickyFooter/>
                    </div>
                </div>
            );
        } else {
            return (
            <div>
                <h1>Please log in to view this page :(</h1>
                <Link to={'/login'}>
                    <Button variant="outlined" >Log In Here</Button>
                </Link>
            </div>)
        }
    }

}

export default WishList;
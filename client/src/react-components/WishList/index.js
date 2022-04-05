import React from "react";
//import database from '../../database'
import AppBar from "../AppBar";
import { Navigate } from 'react-router-dom';
import StickyFooter from "../StickyFooter";
import { checkSession } from "../../actions/user";
import { findPostByWishlisted } from "../../actions/post";

class WishList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userId: "",
            admin: false,
            posts: [],
            redirect: false,
            redirectPostId: -1
        }
    }

    componentDidMount() {
        checkSession(this, () => {
            findPostByWishlisted(this)
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

    loopThroughPosts = () => {
        const components = []
        for (const [ , value] of Object.entries(this.state.posts)) {
            //for (const [k, v] of Object.entries(value)) {
                components.push (
                    <div>
                        <div className="block">
                            {/*<a className="title" href={`postpage/${value.postId}`}><b><u>{value.header}</u></b></a>*/}
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
            return (<h1>Please log in to view this page. :(</h1>);
        }
    }

}

export default WishList;
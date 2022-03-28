import React from "react";
// import './styles.css'
import database from '../../database'
import AppBar from "../AppBar";
import { uid } from "react-uid";
import Button from '@mui/material/Button';
import { Navigate } from 'react-router-dom';
import StickyFooter from "../StickyFooter";


class WishList extends React.Component {

    constructor() {
        super()
        this.state = {
            user: {},
            posts: {},
            redirect: false,
            redirectPostId: -1
        }
    }

    /*getPost = (post) => {
        //return post.postId === this.state.postId;
        //return this.state.postId.some(item => post.postId === item.postId);
        return this.state.postId.includes(post.postId);
    }*/

    getPost = (post) => {
        const wishlisted = database.users.filter(this.getUser)[0].wishlisted;
        return wishlisted.includes(post.postId);
    }

    getUser = (user) => {
        return user.userId === this.props.userId;
    }

    initStateInfo = () =>{
        this.setState({
            user: database.users.filter(this.getUser)[0],
            posts: database.posts.filter(this.getPost),
          }, () => console.log(this.state))
    }

    componentDidMount() {
        if (this.props.userId > -1) {
            this.initStateInfo();
        }
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

    /*loopThroughPosts = () => {

        for (const [key, value] of Object.entries(this.state.posts)) {
            console.log(`${key}: ${value}`);
            for (const [k, v] of Object.entries(value)) {
                console.log(`${k}: ${v}`);
                console.log(value.imageSrc);
                return (<div>{value.categories}</div>);
            }
        }
    }*/

    loopThroughPosts = () => {
        const components = []
        for (const [key, value] of Object.entries(this.state.posts)) {
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
        if (this.props.userId > -1) {
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
            return (<h1>Please log in to view this page.</h1>);
        }
    }

}

export default WishList;
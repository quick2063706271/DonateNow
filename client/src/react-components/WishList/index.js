import React from "react";
import "./styles.css";
import database from '../../database'
import AppBar from "../AppBar";
import { uid } from "react-uid";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import StickyFooter from "../StickyFooter";


class WishList extends React.Component {

    state = {
        userId: 2,
        user: {},
        post: {},
        //postId: [1,2],
    };

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
        //return user.userId === this.props.userId[0];
        return user.userId === this.state.userId;
    }

    initStateInfo = () =>{
        this.setState({
            user: database.users.filter(this.getUser)[0],
            post: database.posts.filter(this.getPost),
          }, () => console.log(this.state))
    }

    componentDidMount() {
        this.initStateInfo();
    }

    /*loopThroughPosts = () => {

        for (const [key, value] of Object.entries(this.state.post)) {
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
        for (const [key, value] of Object.entries(this.state.post)) {
            //for (const [k, v] of Object.entries(value)) {
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
            //}
        }
        return components;
    }

    render() {
        return (
            <div>
                <AppBar/>

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
    }

}

export default WishList;

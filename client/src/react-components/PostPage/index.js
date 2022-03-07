import React from "react";
import "./styles.css";
import database from '../../database'
import PostPageHelp from "../PostPagehelp";
import AppBar from "../AppBar";
import StickyFooter from "../StickyFooter";
import ComponentParamsWrapper from "../ParamsWrapper";
import AdminAppBar from "../AdminAppBar";
import { Button } from "@material-ui/core";
import { uid } from "react-uid";
import { Link } from 'react-router-dom';

class PostPage extends React.Component {
    state = {
        postId: -1,
        transaction: null,
        post: null,
        user: null,
        wishlisted: null
        // postPath: "/postpage/" + this.state.PostId.toString(),
    };


    getPost = (post) => {
        return post.postId === this.state.postId;
    }

    getUser = (user) => {
        return user.userId === this.props.userId;
    }

    getTransaction = (transaction) => {
        return (
            (transaction.postId === this.state.postId && transaction.ownerId === this.props.userId)
            ||
            (transaction.postId === this.state.postId && transaction.viewerId === this.props.userId)
            );
    }

    getWishlist = (user) => {
        return user.wishlisted.postId === this.state.postId && user.userId === this.props.userId;
    }

    handleWishlishted = event => {
        this.setState({
            wishlisted: !this.state.wishlisted
        });
    }

    initStateInfo = () => {
        this.setState({
            postId: parseInt(this.props.params.id)
        }, () => {
            this.setState({
                post: database.posts.filter(this.getPost)[0],
                user: database.users.filter(this.getUser)[0],
                transaction: database.transactions.filter(this.getTransaction)[0],
                wishlisted: database.users.filter(this.wishlisted)[0]
            }, () => console.log(this.state))
        })
    }

    componentDidMount() {
        this.initStateInfo()
    }

    render() {
        return (
            <div>
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
                {this.state.post ? <PostPageHelp
                    userId = {this.props.userId}
                    postId = {this.state.postId}
                    transaction = {this.state.transaction}
                    post = {this.state.post}
                    user = {this.state.user}
                    wishlisted = {this.state.wishlisted}

                    // ownerId = {this.state.transaction.ownerId}
                    /> : null}

                <div>
                    <StickyFooter/>
                </div>

            </div>
        );
    }
}

export default ComponentParamsWrapper(PostPage);

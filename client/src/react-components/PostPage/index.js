import React from "react";
import "./styles.css";
import database from '../../database'
import PostPageHelp from "../PostPagehelp";
import AppBar from "../AppBar";
import StickyFooter from "../StickyFooter";

class PostPage extends React.Component {
    state = {
        postId: -1,
        transaction: null,
        post: null,
        user: null,
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

    getPostIdFromUrl = (url) => {
        if (!url.includes("?")) {
            return parseInt(window.location.href.substring(window.location.href.lastIndexOf('/') + 1));
        } else {
            // Handle in the future
        }
    }

    initStateInfo = () =>{
        this.setState({
            postId: this.getPostIdFromUrl(window.location.href)
        }, () => {
            this.setState({
                post: database.posts.filter(this.getPost)[0],
                user: database.users.filter(this.getUser)[0],
                transaction: database.transactions.filter(this.getTransaction)[0],
            }, () => console.log(this.state))
        })
    }

    componentDidMount() {
        this.initStateInfo()
    }

    render() {
        return (
            <div>
                <AppBar/>
                {this.state.post ? <PostPageHelp
                    userId = {this.props.userId}
                    postId = {this.state.postId}
                    transaction = {this.state.transaction}
                    post = {this.state.post}
                    user = {this.state.user}
                    /> : null}

                <div>
                    <StickyFooter/>
                </div>

            </div>
        );
    }
}

export default PostPage;

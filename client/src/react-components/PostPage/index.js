import React from "react";
import "./styles.css";
import database from '../../database'
import PostPageHelp from "../PostPagehelp";
import AppBar from "../AppBar";

class PostPage extends React.Component {
    state = {
        postId: 2,
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

    initStateInfo = () =>{
        this.setState({
            post: database.posts.filter(this.getPost)[0],
            user: database.users.filter(this.getUser)[0],
            transaction: database.transactions.filter(this.getTransaction)[0],
          }, () => console.log(this.state))
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
            </div>
        );
    }
}

export default PostPage;
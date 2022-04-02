import React from "react";
import "./styles.css";
import database from '../../database'
import PostPageHelp from "../PostPagehelp";
import AppBar from "../AppBar";
import StickyFooter from "../StickyFooter";
import ComponentParamsWrapper from "../ParamsWrapper";
import AdminAppBar from "../AdminAppBar";
import { checkSession } from "../../actions/user";
import { getPost } from "../../actions/post"

class PostPage extends React.Component {
    state = {
        postId: "",
        post: null,
        userId: null,
        admin: false
    };

    componentDidMount() {
        console.log(this.props.params.id)
        checkSession(this)
        this.setState({
            postId: this.props.params.id
        }, this.fetchPost)
    }

    fetchPost = () => {
        getPost(this)
    }

    render() {
        return this.state.post ? (
            <div>
                {/* {this.props.userId === -1 ? 
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

                    // ownerId = {this.state.transaction.ownerId}
                    /> : null} */}

                <div>
                    <StickyFooter/>
                </div>

            </div>
        ) : <p>Post does not exist</p>;
    }
}

export default ComponentParamsWrapper(PostPage);
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

                {this.state.post ? <PostPageHelp
                    userId = {this.state.userId}
                    postId = {this.state.postId}
                    admin = {this.state.admin}
                    post = {this.state.post}
                    /> : null}

                <div>
                    <StickyFooter/>
                </div>

            </div>
        ) : <p>Post does not exist</p>;
    }
}

export default ComponentParamsWrapper(PostPage);
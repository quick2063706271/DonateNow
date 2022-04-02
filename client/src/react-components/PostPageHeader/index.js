import React from "react";
import Button from '@mui/material/Button';
import './styles.css';
import { Link } from "react-router-dom";
import ChooseDonee from "../ChooseDonee";
import RequestNowDialogue from "../RequestNowDialogue";
import WishListDialogue from "../WishListDialogue";
import { changeOwnerStatus, changeViewerStatus } from "../../actions/post";

function PostPageHeaderHelper(props){
    const {post, userId, admin} = props
    if (userId === ""){ //if not signed in, direct to sign in page
        return (
            <span>
                <Link to={'/login'}>
                    <Button className="postButton" id="requestNowButton" variant="outlined" >Login to see more</Button>
                </Link>
            </span>
        )
    }
   else if (admin){ //if viewing as admin, show **BLOCK POST** or **User Profile***
        return (
            <span>
                <Link Link to={'/admin/userpage/' + post.ownerId}>
                    <Button className="postButton" id="requestNowButton" variant="outlined" >User Profile</Button>
                </Link>
                <Button className="postButton" id="saveButton" variant="outlined">Block Post</Button>
            </span>
        )
    }
    else{  // if viewing as regular user
        const userStatus = checkRegularUser(post, userId)
        if (userStatus === "visitor" ){  // as visitor
            return (
                <span>
                    {console.log(props.userId, props.post, props.postId)}
                    <RequestNowDialogue post={props.post} btnId="chooseDoneeButton"/>
                    <WishListDialogue post={props.post} btnId="chooseDoneeButton"/>
                </span>
            )
        }else if (userStatus === "owner"){  //as owner
            if (post.viewer.length === 0){  ///owner has posted, but no one has requested => ownerStatus: "Posted"
                return (
                    <span>
                        <text className="statusMsg">Owner Status: {post.ownerStatus}</text> 
                    </span>
                )
            }else{
                if (post.ownerStatus == "Posted"){ //some users have requested, owner needs to choose => ownerStatus: "Posted"
                    return (
                        <span>
                            <text className="statusMsg">Owner Status: {post.ownerStatus}</text>
                            <ChooseDonee class="postButton" btnId="chooseDoneeButton"
                                        userId={userId}  postId={postId}/>
                        </span>
                    )
                }else if (props.transaction.ownerStatus == "Donation Matched"){ //Owner has done choosing donee => ownerStatus: "Donation Matched"
                    return (
                        <span>
                            <text className="statusMsg">Owner Status: {post.ownerStatus}</text>
                            <br></br>
                            <Button className="postButton" id="failButton"
                                    onClick={ () => changeOwnerStatus(post.postId, "Failed")}
                                    variant="outlined">Failed</Button>
                            <Button className="postButton" id="completeButton"
                                    onClick={ () => changeOwnerStatus(post.postId, "Completed")}
                                    variant="outlined">Completed</Button>
                        </span>
                    )
                }else{    //ownerStatus: "Completed" or "Failed"
                    <span>
                            <text className="statusMsg">Owner Status: {post.ownerStatus}</text>
                    </span>
                }
            }

        }else{  //as viewer
            if (props.transaction.viewerStatus == "Request Accepted"){
                return (
                    <span>
                        <text className="statusMsg">Viewer Status: {post.viewerStatus}</text>
                        <br></br>
                            <Button className="postButton" id="failButton"
                                    onClick={ () => changeViewerStatus(post.postId, userId, "Failed")}
                                    variant="outlined">Failed</Button>
                            <Button className="postButton" id="completeButton"
                                    onClick={ () => changeViewerStatus(post.postId, userId, "Completed")}
                                    variant="outlined">Completed</Button>
                    </span>
                )
            }else{
                return(
                    <span>
                        <text className="statusMsg">Viewer Status: {props.transaction.viewerStatus}</text>
                    </span>
                )
            }
        }
    }
}

function checkRegularUser (post, userId) {
    const getViewerById = post.viewers.filter(viewer => viewer.viewerId === userId)
    if (post.ownerId === userId) {
        return "owner"
    }else if (getViewerById.length> 0){
        return "viewer"
    }else{
        return "visitor"
    }
}

class PostPageHeader extends React.Component {

    render() {
        return (
            <div className="postHeader">
                    <text id="createPostText"> {this.props.post.header} </text>
                    <PostPageHeaderHelper userId={this.props.userId}
                                          post={this.props.post}
                                          admin={this.props.admin}
                    />
                </div>
            
        );
    }

}

export default PostPageHeader;
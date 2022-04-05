import React from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import ChooseDonee from "../ChooseDonee";
import RequestNowDialogue from "../RequestNowDialogue";
import WishListDialogue from "../WishListDialogue";
import { changeOwnerStatus, changeViewerStatus } from "../../actions/post";

function PostPageHeaderHelper(props){
    const {post, postId, userId, admin} = props
    if (userId === ""){ /*if not signed in, direct to sign in page*/
        return (
            <span>
                <Link to={'/login'}>
                    <Button className="postButton" id="requestNowButton" variant="outlined" >Login to see more</Button>
                </Link>
            </span>
        )
    }
   else if (admin){ /*if viewing as admin, show **BLOCK POST** or **User Profile*** */
        return (
            <span>
                <Link Link to={'/admin/userpage/' + post.ownerId}>
                    <Button className="postButton" id="requestNowButton" variant="outlined" >User Profile</Button>
                </Link>
                <Button className="postButton" id="saveButton" variant="outlined">Block Post</Button>
            </span>
        )
    }
    else{  /*if viewing as regular user*/
        const userStatus = checkRegularUser(post, userId)
        console.log(userStatus)
        if (userStatus === "visitor" ){  /* as visitor */
            return (
                <span>
                    {console.log(userId, post, postId)}
                    <RequestNowDialogue post={post} btnId="chooseDoneeButton"/>
                    <WishListDialogue post={post} btnId="chooseDoneeButton"/>
                </span>
            )
        }else if (userStatus === "owner"){  /* as owner */
            if (post.viewers.length === 0){  /*owner has posted, but no one has requested => ownerStatus: "Posted"*/
                return (
                    <span>
                        <text className="statusMsg">Owner Status: {post.ownerStatus}</text> 
                    </span>
                )
            }
            else{
                if (post.ownerStatus === "Posted"){ /* some users have requested, owner needs to choose => ownerStatus: "Posted" */
                    return (
                        <span>
                            <text className="statusMsg">Owner Status: {post.ownerStatus}</text>
                            <ChooseDonee class="postButton" btnId="chooseDoneeButton"
                                        userId={userId}  postId={postId}/>
                        </span>
                    )
                }else if (post.ownerStatus === "Donation Matched"){ /* Owner has done choosing donee => ownerStatus: "Donation Matched" */
                    return (
                        <span>
                            <text className="statusMsg">Owner Status: {post.ownerStatus}</text>
                            <br></br>
                            <Button className="postButton" id="failButton"
                                    onClick={ () => changeOwnerStatus(postId, "Failed")}
                                    variant="outlined">Failed</Button>
                            <Button className="postButton" id="completeButton"
                                    onClick={ () => changeOwnerStatus(postId, "Completed")}
                                    variant="outlined">Completed</Button>
                        </span>
                    )
                }else{    /* ownerStatus: "Completed" or "Failed" */
                    return (
                        <span>
                            <text className="statusMsg">Owner Status: {post.ownerStatus}</text>
                        </span>
                    )
                }
            }

        }else{  /* as viewer */
            const viewer = post.viewers.filter(viewer => viewer.viewerId === userId)[0]
            if (viewer.viewerStatus === "Request Accepted"){
                return (
                    <span>
                        <text className="statusMsg">Viewer Status: {viewer.viewerStatus}</text>
                        <br></br>
                            <Button className="postButton" id="failButton"
                                    onClick={ () => changeViewerStatus(postId, userId, "Failed")}
                                    variant="outlined">Failed</Button>
                            <Button className="postButton" id="completeButton"
                                    onClick={ () => changeViewerStatus(postId, userId, "Completed")}
                                    variant="outlined">Completed</Button>
                    </span>
                )
            }else{
                return(
                    <span>
                        <text className="statusMsg">Viewer Status: {viewer.viewerStatus}</text>
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
                                          postId = {this.props.post._id.toString()}
                                          admin={this.props.admin}
                    />
                </div>
            
        );
    }

}

export default PostPageHeader;
import React from "react";
import Button from '@mui/material/Button';
import { Link } from "react-router-dom";
import ChooseDonee from "../ChooseDonee";
import RequestNowDialogue from "../RequestNowDialogue";
import WishListDialogue from "../WishListDialogue";
import { changeOwnerStatus, changeViewerStatus } from "../../actions/post";
import {useNavigate} from "react-router-dom";
import ViewDonorAndDonee from "../ViewDonorAndDonee"

function WithNavigate(props) {
    let navigate = useNavigate();
    let txt = "< Go Back"
    return <Button id="backButton" onClick={() => navigate(-1)}> {txt}
    </Button>
}

function PostPageHeaderHelper(props){
    const {post, postId, userId, admin} = props
    if (userId === ""){ /*if not signed in, direct to sign in page*/
        return (
            <span>
                <Link to={'/login'}>
                    <Button id="postLoginButton" variant="outlined" >Login to see more</Button>
                </Link>
            </span>
        )
    }
   else if (admin){ /*if viewing as admin, show **BLOCK POST** or **User Profile*** */
        return (
            <span>
                <Link Link to={'/admin/userpage/' + post.ownerId}>
                    <Button id="requestNowButton" variant="outlined" >User Profile</Button>
                </Link>
                <Button id="saveButton" variant="outlined">Block Post</Button>
            </span>
        )
    }
    else{  /*if viewing as regular user*/
        const userStatus = checkRegularUser(post, userId)
        console.log(userStatus)
        if (userStatus === "visitor" ){  /* as visitor */
            return (
                <span>
                    <RequestNowDialogue post={post} postId={postId} userId={userId} btnId="requestNowButton"/>
                    <WishListDialogue post={post} postId={postId} userId={userId} btnId="wishListButton"/>
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
                            <ChooseDonee btnId="chooseDoneeButton"
                                        userId={userId}  postId={postId}/>
                        </span>
                    )
                }else if (post.ownerStatus === "Donation Matched"){ /* Owner has done choosing donee => ownerStatus: "Donation Matched" */
                    return (
                        <span>
                            <text className="statusMsg">Owner Status: {post.ownerStatus}</text>
                            <br></br>
                            <Button id="failButton"
                                    onClick={ () => changeOwnerStatus(postId, "Failed")}
                                    variant="outlined">Failed</Button>
                            <Button id="completeButton"
                                    onClick={ () => changeOwnerStatus(postId, "Completed")}
                                    variant="outlined">Completed</Button>
                            <ViewDonorAndDonee userId={userId} type="donor"/>
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
                            <Button id="failButton"
                                    onClick={ () => changeViewerStatus(postId, userId, "Failed")}
                                    variant="outlined">Failed</Button>
                            <Button id="completeButton"
                                    onClick={ () => changeViewerStatus(postId, userId, "Completed")}
                                    variant="outlined">Completed</Button>
                            <ViewDonorAndDonee userId={viewer.viewerId} type="donee"/>
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
                    <WithNavigate/>
                    <br></br>
                    <br></br>
                    {/* <h1 id="postHeader"> {this.props.post.header} </h1> */}
                    <text id="postHeader">{this.props.post.header}</text>
                    <br></br>
                    <br></br>
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
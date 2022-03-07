import React from "react";
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import './styles.css';
import { Link } from "react-router-dom";
import database from "../../database";
import ChooseDonee from "../ChooseDonee";
import RequestNowDialogue from "../RequestNowDialogue";

function DeliveryOptionGenerator(props){
    if (props.deliveryOption == "Pickup"){
        return(
            <FormGroup className="deliveryOptionForm">
                <FormControlLabel  className="deliveryOption" control={<Checkbox size="large" disabled/>} label={<Typography variant="h5">By Courier</Typography>} />
                <FormControlLabel  className="deliveryOption" control={<Checkbox size="large" disabled checked />} label={<Typography variant="h5">Pick Up</Typography>} />
            </FormGroup>
        )
    }else{
        return(
            <FormGroup className="deliveryOptionForm">
                <FormControlLabel  className="deliveryOption" control={<Checkbox size="large" disabled checked/>} label={<Typography variant="h5">By Courier</Typography>} />
                <FormControlLabel  className="deliveryOption" control={<Checkbox size="large" disabled  />} label={<Typography variant="h5">Pick Up</Typography>} />
            </FormGroup>
        )
    }
}


function CategoryGenerator(props){
    return(
        <Box  id="postpageCategoryBox"
            sx={{
                width: 500,
                maxWidth: '76%',
                height: 1,
            }}
        >
        <FormGroup className="postPageDeliveryOptionForm">
            {props.categories.map(
                (category) => {
                    return (<FormControlLabel
                        control={<Checkbox name={category} disabled checked/>}
                        label={category}
                    /> )
            })}
        </FormGroup>
        </Box>
    )
}

function PostHeaderHelper(props){
    const {post} = props
    if (props.userId === -1){
        return (
            <span>
                <Link to={'/login'}>
                    <Button className="postButton" id="requestNowButton" variant="outlined" >Login to see more</Button>
                </Link>
            </span>
        )
    }
   else if (database.getUserData(props.userId).admin){
        return (
            <span>
                <Link Link to={'/admin/userpage/' + post.ownerId}>
                    <Button className="postButton" id="requestNowButton" variant="outlined" >User Profile</Button>
                </Link>
                <Button className="postButton" id="saveButton" variant="outlined">Delete Post</Button>
            </span>
        )
    }
    else{


    if (props.transaction == null){//undefined
        return (
            <span>
                <RequestNowDialogue post={props.post}/>
                <Button className="postButton" id="saveButton" variant="outlined" onClick={this.handleWishlishted}>{this.state.wishlisted ? "Save to Wishlist" : "Wishlisted!"} </Button>

                /// original SAVE TO WISHLIST button
                {/*Button className="postButton" id="saveButton" variant="outlined">Save to WishList</Button>*/}
            </span>
        )
    }else if (props.transaction.ownerId == props.userId){
        if (props.transaction.viewerId === -1){
            return (
                <span>
                    <text className="statusMsg">Owner Status: {props.transaction.ownerStatus}</text>
                </span>
            )
        }else{
            if (props.transaction.ownerStatus == "posted"){
                return (
                    <span>
                        <text className="statusMsg">Owner Status: {props.transaction.ownerStatus}</text>
                        {/* <Link to="/choosedonee">
                            <Button className="postButton" id="saveButton" variant="outlined">Choose Donee</Button>
                        </Link> */}
                        <ChooseDonee class="postButton" btnId="chooseDoneeButton"
                                    userId={props.userId}  postId={props.postId}/>
                    </span>
                )
            }else if (props.transaction.ownerStatus == "donation matched"){
                return (
                    <span>
                        <text className="statusMsg">Owner Status: {props.transaction.ownerStatus}</text>
                        <br></br>
                        <Button className="postButton" id="failButton"
                                onClick={ () => handleStatusChange(props.transaction, "owner", "completed")}
                                variant="outlined">Failed</Button>
                        <Button className="postButton" id="completeButton"
                                onClick={ () => handleStatusChange(props.transaction, "owner", "failed")}
                                variant="outlined">Completed</Button>
                    </span>
                )
            }else{
                <span>
                        <text className="statusMsg">Owner Status: {props.transaction.ownerStatus}</text>
                </span>
            }
        }

    }else{
        if (props.transaction.viewerStatus == "request accepted"){
            return (
                <span>
                    <text className="statusMsg">Viewer Status: {props.transaction.viewerStatus}</text>
                    <br></br>
                        <Button className="postButton" id="failButton"
                                onClick={ () => handleStatusChange(props.transaction, "viewer", "completed")}
                                variant="outlined">Failed</Button>
                        <Button className="postButton" id="completeButton"
                                onClick={ () => handleStatusChange(props.transaction, "viewer", "failed")}
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

function handleStatusChange (transaction, user, val) {
    database.changeStatus(transaction, user, val)
}

class PostPageHelp extends React.Component {

    render() {
        return (
            <div>
                <div className="postHeader">
                    <text id="createPostText"> {this.props.post.header} </text>
                    <PostHeaderHelper transaction={this.props.transaction}
                                      userId={this.props.userId}
                                      post={this.props.post}
                                      post={this.props.wishlisted}
                    />
                </div>

                <div className="postBackground">

                <div className="postImageArea">
                    <div id="postpageImageDiv" >
                            <img src={this.props.post.imageSrc} id="postpageImage" alt="postImage"/>
                            <text id="imagelabel">[image: {this.props.post.imageSrc}]</text>
                    </div>
                </div>
                <div className="postContentArea">
                    <div>
                        <text className="viewPostText">Details of this donation post:</text>
                    </div>
                    <div className="postContentItems">
                            <text className="textTitleItem">  <u>Categories:</u></text>
                            <CategoryGenerator categories={this.props.post.categories}/>
                    </div>
                    <div className="postContentItems">
                            <text className="textTitleItem"> <u>Location:</u></text>
                            <text className="textContentItem"> {this.props.post.location}</text>
                    </div>
                    <div className="postContentItems">

                        <div id="description">
                            <text className="textTitleItem">  <u>Description: </u></text>
                        </div>
                        <br></br>
                        <br></br>
                        <Box  id="descriptionBox"
                            sx={{
                                width: 700,
                                maxWidth: '100%',
                                height: 1,
                            }}
                         >
                             <text className="descriptionContentItem">{this.props.post.description}</text>
                         </Box>

                    </div>



                    <div className="postContentItems">
                            <text className="textTitleItem">  <u>Views:</u></text>
                            <text className="textContentItem"> {this.props.post.views}</text>
                    </div>
                    <div className="postContentItems">
                            <text className="textTitleItem">  <u>Requests:</u></text>
                            <text className="textContentItem"> {this.props.post.requests}</text>
                    </div>
                    <div className="postContentItems">
                            <text className="textTitleItem">  <u>Saved:</u></text>
                            <text className="textContentItem"> {this.props.post.saved}</text>
                    </div>
                </div>

                <div className="postpageDeliveryOptionArea">
                        <text className="text">Delivery Option:</text>
                        <DeliveryOptionGenerator deliveryOption={this.props.post.deliveryOption}/>
                    </div>
            </div>
            </div>

        );
    }

}

export default PostPageHelp;

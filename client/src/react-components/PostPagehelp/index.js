import React from "react";
import Button from '@mui/material/Button';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import './styles.css';
import { Link } from "react-router-dom";

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
    // console.log(props.category)
    return(
        <Box className="postPageTextBox" id="categoryBox"
            sx={{
                width: 500,
                maxWidth: '76%',
                height: 350,
            }}
        >
        <FormGroup className="deliveryOptionForm">
            {/* {console.log(props.categories)} */}
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
    if (props.transaction == null){//undefined
        return (
            <span styles="float: left">
                <Button className="postButton" id="requestNowButton" variant="outlined">Request Now</Button>
                <Button className="postButton" id="saveButton" variant="outlined">Save to WishList</Button>
    
            </span>
        )
    }else if (props.transaction.ownerId == props.userId){
        if (props.transaction.viewerId === -1){
            return (
                <span styles="float: right">
                    <text className="textContentItem">Owner Status: {props.transaction.ownerStatus}</text>
                </span>
            )
        }else{
            return (
                <span styles="float: right">
                    <text className="textContentItem">Owner Status: {props.transaction.ownerStatus}</text>
                    <Link to="/choosedonee">
                        <Button className="postButton" id="saveButton" variant="outlined">Choose Donee</Button>
                    </Link>
                </span>
            )
        }
        
    }else{
        return (
            <span styles="float: right">
                <text className="textContentItem">Viewer Status: {props.transaction.viewerStatus}</text>
            </span>
        )
    }
}

class PostPageHelp extends React.Component {
    
    render() {
        // const {userId, postId, transaction, post, user} = this.props
        // {console.log(this.props)}
        return (
            <div>
                <div className="postHeader">
                    <text id="createPostText"> {this.props.post.header} </text> 
                    <PostHeaderHelper transaction={this.props.transaction} 
                                      userId={this.props.userId}
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
                        <text className="viewPostText"> Details of this donation post:</text>
                    </div>
                    
                    <div className="postContentItems">
                            <text className="textTitleItem"> <u>Location:</u></text>
                            <text className="textContentItem"> {this.props.post.location}</text>
                    </div>
                    <div className="postContentItems">
                        <div styles="height: 100%; width: 100%">
                            <text className="textTitleItem">  <u>Description:</u></text>
                        </div>
                            <text className="textContentItem"> {this.props.post.description}</text>
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
                    <div className="postContentItems">
                            <text className="textTitleItem">  <u>Categories:</u></text>
                            <CategoryGenerator categories={this.props.post.categories}/>
                    </div>
                </div>

                <div className="deliveryOptionArea">
                        <text className="text">Delivery Option:</text>
                        {/* {console.log(this.props)} */}
                        <DeliveryOptionGenerator deliveryOption={this.props.post.deliveryOption}/>
                    </div>
            </div>
            </div>
            
        );
    }

}

export default PostPageHelp;
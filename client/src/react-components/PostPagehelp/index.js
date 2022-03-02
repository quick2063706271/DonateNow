import AppBar from "../AppBar";
import React from "react";
import Button from '@mui/material/Button';
import upload from "../../upload.png" 
import PostImage from "../PostImage";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './styles.css'

class PostPageHelp extends React.Component {

    // renderPostHeader (){
    //     if (this.props.transaction.viewerId === this.props.postID){ //post owner
    //         return (
    //             <>
    //                 <Button className="postButton" id="requestNowButton" variant="outlined">Save to WishList</Button>
    //                 <Button className="postButton" id="saveButton" variant="outlined">Request Now</Button>
    //             </>
    //         )
    //     }
    // }

    render() {
        return (
            <div className="postBackground">
                <div className="postHeader">
                    <text id="createPostText"> {this.props.post.header} </text> 
                    <Button className="postButton" id="requestNowButton" variant="outlined">Save to WishList</Button>
                    <Button className="postButton" id="saveButton" variant="outlined">Request Now</Button>
                </div>
                <div className="postImageArea">
                    <PostImage imageSrc={this.props.post.imageSrc}/>
                </div>
                <div className="postContentArea">
                    <div>
                        <text className="viewPostText"> Details of this donation post:</text>
                    </div>
                    
                    <div className="postContentItem">
                            <text className="textTitleItem"> Location:</text>
                            <text className="textContentItem"> {this.props.post.location}</text>
                        </div>
                </div>

                <div className="deliveryOptionArea">
                        <text className="text">Delivery Option:</text>
                        <FormGroup className="deliveryOptionForm">
                            <FormControlLabel  className="deliveryOption" control={<Checkbox size="large"/>} label={<Typography variant="h5">By Courier</Typography>} />
                            <FormControlLabel  className="deliveryOption" control={<Checkbox size="large"/>} label={<Typography variant="h5">Pick Up</Typography>} />
                        </FormGroup>
                    </div>
            </div>
        );
    }

}

export default PostPageHelp;
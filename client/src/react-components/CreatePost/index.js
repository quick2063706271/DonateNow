import AppBar from "../AppBar";
import React from "react";
import Button from '@mui/material/Button';
import "./styles.css";
import upload from "../../upload.png"
import books from "../../books.png"
import PostImage from "../PostImage";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from "@mui/material";
class CreatePost extends React.Component {
    render() {
        return (
            <div>
                <AppBar/>

                <div id="background">
                    <div className="postHeader">
                        <text id="createPostText">Post Your Donation Now</text>
                        <Button id="publishButton" variant="outlined">Publsih</Button>
                    </div>
                    <div className="postImageArea">
                        {/* <PostImage imageSrc={upload}/> */}
                        {/* <PostImage imageSrc={books}/> */}
                        <Button id="publishButton" variant="outlined">Upload</Button>
                    </div>
                    <div className="postContentArea">
                        <text className="text"> Please enter details of your donation post below:</text>
                    </div>
                    <div className="deliveryOptionArea">
                        <text className="text">Delivery Option:</text>
                        <FormGroup className="deliveryOptionForm">
                            {/* <FormControlLabel  className="deliveryOption" control={<Checkbox defaultChecked size="large"/>} label="By Courier" /> */}
                            {/* <FormControlLabel  className="deliveryOption" control={<Checkbox size="large"/>} label="Pick Up" /> */}
                            <FormControlLabel  className="deliveryOption" control={<Checkbox size="large"/>} label={<Typography variant="h5">By Courier</Typography>} />
                            <FormControlLabel  className="deliveryOption" control={<Checkbox size="large"/>} label={<Typography variant="h5">Pick Up</Typography>} />
                        </FormGroup>
                    </div>
                    
                    
                </div>
            </div>
        );
    }

}

export default CreatePost;
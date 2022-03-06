import AppBar from "../AppBar";
import React from "react";
import Button from '@mui/material/Button';
import "./styles.css";
import upload from "../../upload.png"
import PostImage from "../PostImage";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import StickyFooter from "../StickyFooter";

class CreatePost extends React.Component {
    render() {
        return (
            <div>
                <AppBar/>
                <div className="postHeader">
                    <text id="createPostText">Post Your Donation Now:</text>
                        <Button id="publishButton" variant="outlined">Publsih</Button>
                </div>
                
                <div className="postBackground">
                    <div className="postImageArea">
                        <div id="postImageDiv" >
                            <img src={upload} id="postImage" alt="postImage"/>
                            <Button id="uploadButton" variant="outlined">Upload</Button>
                        </div>

                    </div>
                    <div className="postContentArea">
                        <text className="text"> Please enter details of your donation below:</text>

                        <div className="postContentItem">
                            <text className="textItem"> Header:</text>
                            <Box className="textBox"
                                sx={{
                                    width: 600,
                                    maxWidth: '78%',
                                }}
                                >
                                <TextField fullWidth label="Enter Your Header Here..." id="header" />
                            </Box>
                        </div>

                        <div className="postContentItem">
                            <text className="textItem"> Location: </text>
                            <Box className="textBox"
                                sx={{
                                    width: 600,
                                    maxWidth: '74.5%',
                                }}
                                >
                                <TextField fullWidth label="Enter Your Location Here..." id="location" />
                            </Box>
                        </div>
                        <div className="postContentItem">
                            <text className="textItem"> Description: </text>
                            <Box className="textBox"
                                sx={{
                                    width: 600,
                                    maxWidth: '67%',
                                    height: 400,
                                }}
                                >
                                <TextField fullWidth label="Enter Your Description Here..." id="location" />
                            </Box>
                        </div>
                        <div className="postContentItem">
                            <text className="textItem"> Categories: </text>
                            <Box id="categoryBox"
                                sx={{
                                    width: 500,
                                    maxWidth: '76%',
                                    height: 350,
                                }}
                                >
                                <FormGroup>
                                <FormControlLabel
                                    control={<Checkbox name="Toys, Kids, Parents" />}
                                    label="Toys, Kids, Parents"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Clothing" />}
                                    label="Clothing"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Books" />}
                                    label="Books"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Art" />}
                                    label="Art"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Furniture" />}
                                    label="Furniture"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Shoes, Bags, Backpacks" />}
                                    label="Shoes, Bags, Backpacks"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Music" />}
                                    label="Music"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Sports" />}
                                    label="Sports"
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Electronics" />}
                                    label="Electronics"
                                />
                                <FormHelperText>Check all that applies</FormHelperText>
                            </FormGroup>
                            

                            </Box>


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

                <div>
                    <StickyFooter/>
                </div>
            </div>
        );
    }

}

export default CreatePost;

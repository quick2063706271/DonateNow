import AppBar from "../AppBar";
import React from "react";
import Button from '@mui/material/Button';
import "./styles.css";
// import upload from "./upload.png"
import PostImage from "../PostImage";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import StickyFooter from "../StickyFooter";
import database from "../../database";
import { Navigate } from "react-router-dom";

class CreatePost extends React.Component {


    constructor(props){
        super(props);
        this.state = {
            header: "",
            location:"",
            description:"",
            categories: [],
            deliveryOption: "",
            errormsg: false,
            newPostId: -1,
            redirect: false
        };
    }

    handleInputChange(event) {
        const target = event.target
        const value = target.value
        const name = target.name
        // console.log(name, value)
        this.setState({
            [name]: value
        })
    }

    handleDeliveryInputChange(checkedItem) {
        // console.log(checkedItem)
        this.setState({
            deliveryOption: checkedItem
        })
    }

    handleCategoryChange(event) {
        const isChecked = event.target.checked
        const value = event.target.value
        if (isChecked){
            let cat = [...this.state.categories];
            cat.push(value)
            this.setState({ 
                categories: cat
           })
        }else{
            const index=this.state.categories.indexOf(value)
            this.state.categories.splice(index, 1)
            this.setState({
                categories: this.state.categories
            })
        }
    }

    handlePublish (event) {
        if (this.state.categories.length === 0 || this.state.header === "" 
           && this.state.description === "" || this.state.deliveryOption == "" || this.state.location == "")
        {
            this.setState({
                errormsg: true})
        }else{
            this.setState({
                errormsg: false})
            let postId = database.createPost(this.props.userId, 
                this.state.header, this.state.location, this.state.description, 
                this.state.deliveryOption, this.state.categories)
            this.setState({
                newPostId: postId
            }, () => this.setState({
                    redirect: true
                }
            ))
        }
    }

    render() {
        return (
            <div>
                <AppBar/>
                {this.state.redirect ? <Navigate to={`/postpage/${this.state.newPostId}`}/> : null}
                <div className="postHeader">
                    <text id="createPostText">Post Your Donation Now:</text>
                    {/* <text id="errorMsg"><u>You must fill in all entries to publish!</u></text> */}
                    {this.state.errormsg ? 
                        <text id="errorMsg"><u>You must fill in all entries to publish!</u></text>  : null
                        }
                        <Button type="submit"
                                id="publishButton" 
                                onClick={(event) => this.handlePublish(event)}
                                >Publsih
                        </Button>
                </div>
                
                <div className="postBackground">
                    <div className="postImageArea">
                        <div id="postImageDiv" >
                            <img src={"./upload.png"} id="postImage" alt="postImage"/>
                            <Button id="uploadButton">Upload</Button>
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
                                <TextField name="header" value={this.state.header} onChange = {event => this.handleInputChange(event)}
                                           fullWidth label="Enter Your Header Here..." id="header" />
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
                                <TextField name="location" value={this.state.location} onChange = {event => this.handleInputChange(event)}
                                    fullWidth label="Enter Your Location Here..." id="location" />
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
                                <TextField name="description" value={this.state.description} onChange = {event => this.handleInputChange(event)}
                                           fullWidth label="Enter Your Description Here..." id="location" />
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
                                    value="Toys, Kids, Parents"
                                    onChange = {(event) => this.handleCategoryChange(event)}
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Clothing" />}
                                    label="Clothing"
                                    value="Clothing"
                                    onChange = {(event) => this.handleCategoryChange(event)}
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Books" />}
                                    label="Books"
                                    value="Books"
                                    onChange = {(event) => this.handleCategoryChange(event)}
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Art" />}
                                    label="Art"
                                    value="Art"
                                    onChange = {(event) => this.handleCategoryChange(event)}
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Furniture" />}
                                    label="Furniture"
                                    value="Furniture"
                                    onChange = {(event) => this.handleCategoryChange(event)}
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Shoes, Bags, Backpacks" />}
                                    label="Shoes, Bags, Backpacks"
                                    value="Shoes, Bags, Backpacks"
                                    onChange = {(event) => this.handleCategoryChange(event)}
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Music" />}
                                    label="Music" value="Music"
                                    onChange = {(event) => this.handleCategoryChange(event)}
                                    
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Sports" />}
                                    label="Sports" value="Sports"
                                    onChange = {(event) => this.handleCategoryChange(event)}
                                />
                                <FormControlLabel
                                    control={<Checkbox name="Electronics" />}
                                    label="Electronics"
                                    value="Electronics"
                                    onChange = {(event) => this.handleCategoryChange(event)}
                                />
                                <FormHelperText>Check all that applies</FormHelperText>
                            </FormGroup>
                            </Box>


                        </div>

                    </div>
                    <div className="deliveryOptionArea">
                        <text className="text">Delivery Option:</text>
                        <FormGroup className="deliveryOptionForm">
                            <FormControlLabel  className="deliveryOption" 
                                                name="deliveryOption" checked={this.state.deliveryOption==="By Courier"}
                                                onChange = {() => this.handleDeliveryInputChange("By Courier")}
                                                control={<Checkbox size="large"/>} 
                                                label={<Typography variant="h5">By Courier</Typography>} />
                            <FormControlLabel  className="deliveryOption" 
                                                name="deliveryOption" checked={this.state.deliveryOption==="Pickup"}
                                                onChange = {() => this.handleDeliveryInputChange("Pickup")}
                                                control={<Checkbox size="large"/>} 
                                                label={<Typography variant="h5">Pick Up</Typography>} />
                            <FormHelperText>Please only choose one option</FormHelperText>
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

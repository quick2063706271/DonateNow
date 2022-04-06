import AppBar from "../AppBar";
import React from "react";
import Button from '@mui/material/Button';
import "./styles.css";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import StickyFooter from "../StickyFooter";
import { Link, Navigate } from "react-router-dom";
import { checkSession } from "../../actions/user";
import { createPost } from "../../actions/post";
import { addPostImage } from "../../actions/image";

class CreatePost extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            userId: "",
            admin: "",
            header: "",
            location:"",
            description:"",
            categories: [],
            deliveryOption: "",
            errormsg: false,
            newPostId: "",
            redirect: false,
            message: { type: "", body: "" },
            imageId: ""
        };
    }

    componentDidMount() {
        checkSession(this)
    }

    handleInputChange = (event) => {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        })
    }

    handleDeliveryInputChange = (checkedItem) => {
        this.setState({
            deliveryOption: checkedItem
        })
    }

    handleCategoryChange = (event) => {
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

    handlePublish = (event) => {
        if ((this.state.categories.length === 0) || (this.state.header === "") 
           && (this.state.description === "") || (this.state.deliveryOption === "") || (this.state.location === ""))
        {
            this.setState({
                errormsg: true
            })
        } else{
            this.setState({
                errormsg: false
            })
            createPost(this)
        }
    }

    render() {
        if (this.state.userId != "") {
            return (
                <div>
                    <AppBar/>
                    {this.state.redirect ? <Navigate to={`/postpage/${this.state.newPostId}`}/> : null}
                    <div className="createPostHeader">
                        <text id="createPostText">Post Your Donation Now:</text>
                        {this.state.errormsg ? 
                            <text id="errorMsg"><u>You must fill in all entries to publish!</u></text>  : null
                            }
                            <Button type="submit"
                                    id="publishButton" 
                                    onClick={this.handlePublish}
                                    >Publsih
                            </Button>
                    </div>
                    
                    <div className="createPostBackground">
                        <div className="postImageArea">
                            <div id="postImageDiv" >
                            <form className="image-form" onSubmit={(e) => {
                                e.preventDefault();
                                addPostImage(e.target, this);
                            }}>
                                <img src={"./upload.png"} id="postImage" alt="postImage"/>
                                <div class="image-form__field">
                                    <label>Image:</label>
                                    <input name="image" type="file" />
                                </div>
                                <Button type="submit" variant="contained" id="uploadButton">
                                    Upload
                                </Button>
                            </form>
                            <p className={`image-form__message--${this.state.message.type}`}>
                                {this.state.message.body}
                            </p>
                                
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
                                    <TextField name="header" value={this.state.header} onChange = {this.handleInputChange}
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
                                    <TextField name="location" value={this.state.location} onChange = {this.handleInputChange}
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
                                    <TextField name="description" value={this.state.description} onChange = {this.handleInputChange}
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
                                        onChange = {this.handleCategoryChange}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="Clothing" />}
                                        label="Clothing"
                                        value="Clothing"
                                        onChange = {this.handleCategoryChange}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="Books, Stationary" />}
                                        label="Books, Stationary"
                                        value="Books, Stationary"
                                        onChange = {this.handleCategoryChange}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="Art" />}
                                        label="Art"
                                        value="Art"
                                        onChange = {this.handleCategoryChange}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="Furniture" />}
                                        label="Furniture"
                                        value="Furniture"
                                        onChange = {this.handleCategoryChange}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="Shoes, Bags, Backpacks" />}
                                        label="Shoes, Bags, Backpacks"
                                        value="Shoes, Bags, Backpacks"
                                        onChange = {this.handleCategoryChange}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="Music" />}
                                        label="Music" value="Music"
                                        onChange = {this.handleCategoryChange}
                                        
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="Sports" />}
                                        label="Sports" value="Sports"
                                        onChange = {this.handleCategoryChange}
                                    />
                                    <FormControlLabel
                                        control={<Checkbox name="Electronics" />}
                                        label="Electronics"
                                        value="Electronics"
                                        onChange = {this.handleCategoryChange}
                                    />
                                    <FormHelperText>Check all that applies</FormHelperText>
                                </FormGroup>
                                </Box>


                            </div>

                        </div>
                        <div className="createPostDeliveryOptionArea">
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
        else {
            return (
            <div>
                <h1>Please log in to create your post :(</h1>
                <Link to={'/login'}>
                    <Button variant="outlined" >Log In Here</Button>
                </Link>
            </div>)
        }
}

}

export default CreatePost;

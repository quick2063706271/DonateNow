import React from "react";
import "./styles.css";
import { TextField } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";
import { addFeedback } from "../../actions/user";

class Feedback extends React.Component {
    constructor() {
        super()
        this.state = {
            title: "",
            content: "",
            message: null
        }
    }

    handleSubmit = (event) => {
        if (this.state.title === "" || this.state.content === "") {
            console.log("error: empty feedback")
        }
    }

    handleTitleChange = (event) => {
        this.setState({title: event.target.value})
    }

    handleContentChange = (event) => {
        this.setState({content: event.target.value})
    }


    render() {
        return(
            <div id="input-container">
                <Stack
                        component="form"
                        spacing={2}
                        noValidate
                        autoComplete="off"
                >
                    <TextField 
                        className="input"
                        placeholder="Enter your header here …"
                        variant="outlined"
                        value={this.state.title}
                        onChange = {event => this.handleTitleChange(event)}
                    />
                    {/* <br/> */}
                    <TextField
                        className="input"
                        placeholder="Enter your feedback/dispute/complaint here …"
                        multiline
                        rows={10}
                        variant="outlined"
                        value={this.state.content}
                        onChange = {event => this.handleContentChange(event)}
                    />
                    <div>
                        <Button variant="contained"
                                style={{
                                    backgroundColor: "blanchedalmond",
                                    color: "black"
                                }}
                        >UPLOAD PHOTO</Button>
                        <Button 
                            id="submit-button" 
                            variant="contained" 
                            onClick={() => addFeedback(this)}
                            style={{
                                backgroundColor: "blanchedalmond",
                                color: "black"
                            }}
                            >SUBMIT</Button>
                        {this.state.message !== null ?
                            <h4 id="errorMsg"><u> {this.state.message.body}</u></h4>  : null        
                        }
                    </div>
                </Stack>

            </div>
        )
    }
}

export default Feedback;
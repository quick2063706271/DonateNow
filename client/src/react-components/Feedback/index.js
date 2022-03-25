import React from "react";
import "./styles.css";
import { TextField } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";

class Feedback extends React.Component {
    constructor() {
        super()
        this.state = {
            title: "",
            content: "",
            isEmpty: false
        }
    }

    handleSubmit = (event) => {
        if (this.state.title.length === 0 || this.state.content.length === 0) {
            console.log("error: empty feedback")
            this.setState({isEmpty: true})
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
                                    backgroundColor: "#FFD365",
                                }}
                        >UPLOAD PHOTO</Button>
                        <Button 
                            id="submit-button" 
                            variant="outlined" 
                            onClick={this.handleSubmit
                            }
                            style={{
                                backgroundColor: "#FFD365",
                            }}
                            >SUBMIT</Button>
                        {this.state.isEmpty ? 
                            <h4 id="errorMsg"><u>You must fill in all entries to submit!</u></h4>  : null
                        }
                    </div>
                </Stack>

            </div>
        )
    }
}

export default Feedback;
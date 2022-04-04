import React from "react";
import "./styles.css";
import { TextField } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";
import { addFeedback } from "../../actions/user";
import { getFeedbacks } from "../../actions/feedback";

class Feedback extends React.Component {
    constructor() {
        super()
        this.state = {
            userId: -1, 
            title: "",
            content: "",
            message: null, 
            isResolved: false 
        }
    }

    componentDidMount (){
        getFeedbacks(this)
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
                        placeholder="Enter your header here … (at least 10 characters)"
                        variant="outlined"
                        value={this.state.title}
                        onChange = {event => this.handleTitleChange(event)}
                    />
                    {/* <br/> */}
                    <TextField
                        className="input"
                        placeholder="Enter your feedback/dispute/complaint here … (at least 30 characters)"
                        multiline
                        rows={10}
                        variant="outlined"
                        value={this.state.content}
                        onChange = {event => this.handleContentChange(event)}
                    />
                    <div>
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
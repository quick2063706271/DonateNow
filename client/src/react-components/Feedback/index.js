import React from "react";
import "./styles.css";
import { TextField } from "@material-ui/core";
import Stack from '@mui/material/Stack';
import { Button } from "@mui/material";

class Feedback extends React.Component {
    constructor() {
        super()
    }

    render() {
        return(
            <div id="input-container">
                <Stack
                        component="form"
                        sx={{
                            width: '45ch',
                        }}
                        spacing={2}
                        noValidate
                        autoComplete="off"
                >
                    <TextField 
                        className="input"
                        placeholder="Enter your header here …"
                        variant="outlined"
                    />
                    {/* <br/> */}
                    <TextField
                        className="input"
                        placeholder="Enter your feedback/dispute/complaint here …"
                        multiline
                        rows={10}
                        variant="outlined"
                    />
                    <div>
                        <Button variant="contained">UPLOAD PHOTO</Button>
                        <Button id="submit-button" variant="outlined">SUBMIT</Button>
                    </div>
                </Stack>

            </div>
        )
    }
}

export default Feedback;
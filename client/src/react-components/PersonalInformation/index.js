import React from "react";
import "./styles.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@material-ui/core";

// To-do 
// profile picture

class PersonalInformation extends React.Component {
    constructor() {
        super();
        this.state = {
            isEdit: true
        }
        this.handleEdit.bind(this);
        console.log(this.state.isEdit)
    }
    handleEdit = event => {
        this.setState({
            isEdit: !this.state.isEdit
        });
        // this.changeButtonText();
        console.log(this.state.isEdit);
    }

    // changeButtonText = () => {
    //     const buttonElement = document.querySelector(".edit-button").children[0];
    //     if (this.state.isEdit === true) {
    //         buttonElement.innerText = "SAVE";
    //     } else {
    //         buttonElement.innerText = "EDIT";
    //     }
    // }

    render() {
        return(
            <div>
                <Box component="form" 
                sx={{ display: 'flex', flexWrap: 'wrap', '& .MuiTextField-root': { m: 1.5 }, pl: '170px', pt: '100px'}}
                noValidate
                autoComplete="off"
                >
                    <div className="personalInformation">
                        <TextField
                        className="inputFieldId"
                        disabled // Username cannot be changed
                        label="Username"
                        defaultValue="John2022"
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{width: '20ch' }}
                        />
                        
                        <TextField
                        className="inputField"
                        label="Password"
                        defaultValue="12341234"
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Date Of Birth"
                        defaultValue="1990-01-01"
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <TextField
                        className="inputField"
                        label="Gender"
                        defaultValue="Male"
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Address 1"
                        defaultValue="1 King St W, Toronto, ON M5C 1T4"
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        multiline
                        sx={{width: '42.5ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Address 2"
                        defaultValue="4650 Eglinton Ave W, Etobicoke, ON M9R 4C8"
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        multiline
                        sx={{width: '42.5ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Phone number"
                        defaultValue="123-456-7890"
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <TextField
                        className="inputField"
                        label="E-mail"
                        defaultValue="John2022@gmail.com"
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Preference"
                        defaultValue="Books, Travel"
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        multiline
                        sx={{width: '42.5ch' }}
                        />
                        <br />
                        <TextField
                        id="outlined-read-only-input"
                        label="Biography"
                        defaultValue="I enjoy reading books and travelling and travelling and travelling and travelling."
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        multiline
                        sx={{width: '42.5ch' }}
                        />
                        <div className="edit-button" >
                            <Button variant="contained" onClick={this.handleEdit}>
                                {this.state.isEdit ? "edit" : "save"}
                            </Button>
                        </div>
                    </div>

                </Box>
            </div>
        )
    }
  }


export default PersonalInformation;
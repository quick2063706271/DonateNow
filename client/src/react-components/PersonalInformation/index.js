import React from "react";
import "./styles.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@material-ui/core";
import { Avatar } from "@mui/material";


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
        const {username, 
               password, 
               dateOfBirth,
               gender,
               address1,
               address2,
               phone,
               email,
               preference,
               bio} = this.props;
        return(
            <div>
                <Box component="form" 
                sx={{ display: 'flex', flexWrap: 'wrap', '& .MuiTextField-root': { m: 1.5 }, pl: '170px', pt: '100px'}}
                noValidate
                autoComplete="off"
                >
                    <div className="personalInformation">
                        <div>
                            <Avatar id="avatar" sx={{height: 80, width: 80}}>JO</Avatar>
                        </div>
                        <TextField
                        className="inputFieldId"
                        disabled // Username cannot be changed
                        label="Username"
                        defaultValue={username}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{width: '20ch' }}
                        />
                        
                        <TextField
                        className="inputField"
                        label="Password"
                        defaultValue={password}
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Date Of Birth"
                        defaultValue={dateOfBirth}
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <TextField
                        className="inputField"
                        label="Gender"
                        defaultValue={gender}
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Address 1"
                        defaultValue={address1}
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
                        defaultValue={address2}
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
                        defaultValue={phone}
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <TextField
                        className="inputField"
                        label="E-mail"
                        defaultValue={email}
                        InputProps={{
                            readOnly: this.state.isEdit,
                        }}
                        sx={{width: '20ch' }}
                        />
                        <br />
                        <TextField
                        className="inputField"
                        label="Preference"
                        defaultValue={preference}
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
                        defaultValue={bio}
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
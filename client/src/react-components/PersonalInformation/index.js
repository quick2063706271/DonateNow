import React from "react";
import "./styles.css";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from "@material-ui/core";
import { Avatar } from "@mui/material";
import { updateUserForm } from "../../actions/user";
import { updateUser } from "../../actions/user";
import { getUser } from "../../actions/user";
import { checkSession } from "../../actions/user";

class PersonalInformation extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        console.log(this.props)
        this.state = {
            username: this.props.username,
            password: this.props.password,
            dateOfBirth: this.props.dateOfBirth,
            gender: this.props.gender,
            address1: this.props.address1,
            address2: this.props.address2,
            phone: this.props.phone,
            email: this.props.email,
            preference: this.props.preference, 
            bio: this.props.bio,
            isRead: false,
            isEdit: false,
            isComplained: false,
            message: null,
            userId: -1,
            admin: false
        }
        this.handleEdit.bind(this);
        this.handleComplaint.bind(this);
        console.log(this.state.isEdit)
        console.log(this.state.isComplained)
    }
    handleEdit = event => {
        this.setState({
            isEdit: !this.state.isEdit
        });
        // this.changeButtonText();
        console.log(this.state.isEdit);
    }

    handleComplaint = event => {
        this.setState({
            isComplained: !this.state.isComplained
        });
        this.props.complaintNum++;
        // this.changeButtonText();
        console.log(this.state.isComplained);
    }
    handleBlock = event => {
        this.setState({
            accountBlocked: !this.state.accountBlocked
        });
        this.props.accountBlocked = true;
        // this.changeButtonText();
        console.log(this.state.accountBlocked);
    }
    fetchPersonalInformation = () => {
        getUser(this)
        // findPostByKeyword(this, keyword)
    }

    componentDidMount() {
        checkSession(this, this.fetchPersonalInformation); // sees if a user is logged in
    }
    updateUserInfo = (e) => {
        const field = e.target
        const value = field.value;
        const name = field.name;
        console.log(value)
        console.log(name)
        this.setState({
            [name]: value
        });
        console.log(this.state)
    };

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
               bio,
               isRead
               } = this.props;
        //const isAdmin = this.state.admin;
        const isAdmin = this.props.admin;
        // this.state.username = username
        // this.state.password = password
        // this.state.dateOfBirth = dateOfBirth
        // this.state.gender = gender
        // this.state.address1 = address1
        // this.state.address2 = address2
        // this.state.phone = phone
        // this.state.email = email
        // this.state.preference = preference
        // this.state.bio = bio
        let complaint, block;
        if (isAdmin) {
            complaint = <Button variant="contained" display="inline-block" onClick={this.handleComplaint}>
                {this.state.isComplained ? "Complaint logged!" : "Complain the User"}
            </Button>
            block = <Button variant="contained" display="inline-block" onClick={this.handleBlock}>
                {this.state.accountBlocked ? "⠀ ⠀ Blocked ⠀ ⠀ " : "Block the User"}
            </Button>
        } else {
            complaint = null
            block = null
        }
        return(
            <div>
                <Box component="form"
                sx={{ display: 'flex', flexWrap: 'wrap', '& .MuiTextField-root': { m: 1.5 }}}
                noValidate
                autoComplete="off"
                >
                    <div className="personalInformation">
                        <div>
                            <Avatar id="avatar" sx={{height: 80, width: 80}}>JO</Avatar>
                        </div>
                        <div className="complaint-button" >
                            {complaint}
                        </div>
                        <div className="block-button" >
                            {block}
                        </div>
                        <TextField
                        className="inputFieldId"
                        label="Username"
                        name={"username"}
                        value={this.state.username}
                        InputProps={{
                            readOnly: !this.state.isEdit,
                        }}
                        sx={{width: '20ch' }}
                        onChange = {this.updateUserInfo}
                        />
                        {
                            isRead === false &&
                            <TextField
                            className="inputField"
                            name={"password"}
                            label="Password"
                            value={this.state.password}
                            InputProps={{
                                readOnly: !this.state.isEdit
                            }}
                            sx={{width: '20ch' }}
                            onChange = {this.updateUserInfo}
                            />
                        }
                        {
                            isRead === false &&
                            <br />
                        }
                        {
                            isRead === false &&
                            <TextField
                            className="inputField"
                            label="Date Of Birth"
                            name={"dateOfBirth"}
                            value={this.state.dateOfBirth}
                            InputProps={{
                                readOnly: !this.state.isEdit,
                            }}
                            sx={{width: '20ch' }}
                            onChange = {this.updateUserInfo}
                        />
                        }
                        {
                            isRead === false &&
                            <TextField
                            className="inputField"
                            label="Gender"
                            name={"gender"}
                            value={this.state.gender}
                            InputProps={{
                                readOnly: !this.state.isEdit,
                            }}
                            sx={{width: '20ch' }}
                            onChange = {this.updateUserInfo}
                            />
                        }
                        {
                            isRead === false &&
                            <br />
                        }
                        {
                            isRead === false &&
                            <TextField
                            className="inputField"
                            name={"address1"}
                            label="Address 1"
                            value={this.state.address1}
                            InputProps={{
                                readOnly: !this.state.isEdit,
                            }}
                            multiline
                            sx={{width: '42.5ch' }}
                            onChange = {this.updateUserInfo}
                            />
                        }
                        {
                            isRead === false &&
                            <br />
                        }
                        {
                            isRead === false &&
                            <TextField
                            className="inputField"
                            name={"address2"}
                            label="Address 2"
                            value={this.state.address2}
                            InputProps={{
                                readOnly: !this.state.isEdit,
                            }}
                            multiline
                            sx={{width: '42.5ch' }}
                            onChange = {this.updateUserInfo}
                            />
                        }
                        {
                            isRead === false &&
                            <br />
                        }
                        {
                            isRead === false &&
                            <TextField
                            className="inputField"
                            label="Phone number"
                            name={"phone"}
                            value={this.state.phone}
                            InputProps={{
                                readOnly: !this.state.isEdit,
                            }}
                            sx={{width: '20ch' }}
                            onChange = {this.updateUserInfo}
                            />
                        }
                        {
                            isRead === false &&
                            <TextField
                            className="inputField"
                            label="E-mail"
                            name="email"
                            value={this.state.email}
                            InputProps={{
                                readOnly: true,
                            }}
                            disabled // Email cannot be changed
                            sx={{width: '20ch' }}
                            onChange = {this.updateUserInfo}
                            />
                        }
                        <br />
                        <TextField
                        className="inputField"
                        name={"preference"}
                        label="Preference"
                        value={this.state.preference}
                        InputProps={{
                            readOnly: !this.state.isEdit,
                        }}
                        multiline
                        sx={{width: '42.5ch' }}
                        onChange = {this.updateUserInfo}
                        />
                        <br />
                        <TextField
                        id="outlined-read-only-input"
                        name={"bio"}
                        label="Biography"
                        value={this.state.bio}
                        InputProps={{
                            readOnly: !this.state.isEdit,
                        }}
                        multiline
                        sx={{width: '42.5ch' }}
                        onChange = {this.updateUserInfo}
                        />
                        {
                            isRead === false &&
                            <div className="edit-button" >
                                {this.state.isEdit ? 
                                    <Button variant="contained" 
                                            onClick={() => updateUser(this)} 
                                            style={{
                                                backgroundColor: "transparent",
                                            }}> 
                                        save
                                    </Button>
                                : <Button variant="contained" 
                                            onClick={this.handleEdit} 
                                            style={{
                                                backgroundColor: "transparent",
                                            }}> 
                                        edit
                                </Button>}
                            </div>
                        }
                    </div>

                </Box>
            </div>
        )
    }
  }


export default PersonalInformation;

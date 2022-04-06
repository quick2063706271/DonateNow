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
import { getOtherUser, getUserByEmail } from "../../actions/user";
import { addUserImage } from "../../actions/image";
import { getUserImageById } from "../../actions/image";
import { updateBlocklist } from "../../actions/blocklist";

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
            // addresses: this.props.addresses,
            address1: "",
            address2: "",
            phone: this.props.phone,
            email: this.props.email,
            preference: this.props.preference, 
            bio: this.props.bio,
            isRead: false,
            isEdit: false,
            isComplained: false,
            message: null,
            userId: "",
            admin: false,
            image: null,
            message: { type: "", body: "" },
            profileUser: []
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
        console.log(this.state.isComplained);
    }
    handleBlock = event => {
        console.log("Before: ", this.state);
        getUserByEmail(this, this.state.email, () => updateBlocklist(this, this.state.profileUser[0]))
        this.setState({
            accountBlocked: !this.state.accountBlocked
        }, ()=> { console.log("After: ", this.state) });
        this.props.accountBlocked = true;
    }
    fetchPersonalInformation = () => {
        getUser(this)
    }
    fetchOtherUserInformation = () => {

        getOtherUser(this)
    }

    getImage = () =>{
        getUserImageById(this, this.state.userId)
    }

    componentDidMount() {
        if (this.props.isRead) {
            this.setState({
                userId: this.props.userId
            }, this.fetchOtherUserInformation, this.getImage)
            console.log(this.state)
            checkSession(this)
        } else {
            this.setState(this.fetchPersonalInformation)
            checkSession(this, this.getImage)
        }
         // sees if a user is logged in & set current avatar
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

    handleFormSubmit = (e) => {
        e.preventDefault();
        console.log("submitted")
        addUserImage(e.target, this, this.state.userId);
    }

    render() {
        const {
               isRead
               } = this.props;
        const isAdmin = this.state.admin;
        let block;
        if (isAdmin) {
            block = <Button id="block-button" variant="contained" display="inline-block" onClick={this.handleBlock}>
                {this.state.accountBlocked ? "Unblock" : "Block"}
            </Button>
        } else {
            block = null
        }
        console.log(isAdmin)
        return(
            <div>
                {this.state.userId ?
                        <form id="user-image-form" onSubmit={this.handleFormSubmit}>
                                {this.state.image?
                                <Avatar id="avatar" src={this.state.image.image_url}
                                        sx={{height: 80, width: 80}}>
                                </Avatar>
                                :
                                <Avatar id="avatar" 
                                        sx={{height: 80, width: 80}}>U
                                </Avatar>}
                                {isRead === false && !isAdmin ? 
                                <div id="user-upload-button-group">
                                <div class="image-form__field">
                                    <label>Avatar:</label>
                                    <input name="image" type="file" />
                                </div>

                                <Button size="small" type="submit" 
                                    variant="contained" style={{
                                        backgroundColor: "transparent",
                                    }}>
                                    Upload
                                </Button>
                                </div>
                                :null}
                                
                                <p className={`image-form__message--${this.state.message.type}`}>
                                    {this.state.message.body}
                                </p>
                        </form>
                        :null}
                    

                <Box component="form"
                sx={{ display: 'flex', flexWrap: 'wrap', '& .MuiTextField-root': { m: 1.5 }}}
                noValidate
                autoComplete="off"
                >
                    <div className="personalInformation">
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
                            (isRead === false || isAdmin ) &&
                            <TextField
                            className="inputField"
                            disabled
                            name={"password"}
                            label="Password"
                            value={"*********"}
                            InputProps={{
                                readOnly: true
                            }}
                            sx={{width: '20ch' }}
                            onChange = {this.updateUserInfo}
                            />
                        }
                        {
                            (isRead === false || isAdmin ) &&
                            <br />
                        }
                        {
                            (isRead === false || isAdmin ) &&
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
                            (isRead === false || isAdmin ) &&
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
                            (isRead === false || isAdmin ) &&
                            <br />
                        }
                        {
                            (isRead === false || isAdmin ) &&
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
                            (isRead === false || isAdmin ) &&
                            <br />
                        }
                        {
                            (isRead === false || isAdmin ) &&
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
                            (isRead === false || isAdmin ) &&
                            <br />
                        }
                        {
                            (isRead === false || isAdmin ) &&
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
                            (isRead === false || isAdmin ) &&
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
                        <div className="admin-button-group">
                            <div className="block-button" >
                                {block}
                            </div>
                        </div>
                    </div>

                </Box>
            </div>
        )
    }
  }


export default PersonalInformation;

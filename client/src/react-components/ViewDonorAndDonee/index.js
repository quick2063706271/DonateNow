import React from "react";
import "./styles.css";
// import monitorImg from "./monitor.png"
import { Button } from "@mui/material";
import ChooseDonee from "../ChooseDonee";
import { checkSession } from "../../actions/user";
import { changeOwnerStatus } from "../../actions/post";
import { changeViewerStatus } from "../../actions/post";
import { Navigate } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getOtherUser } from "../../actions/user";

class ViewDonorAndDonee extends React.Component{
    constructor() {
        super()
        this.state = {
            userId: null,
            open: false,
            username: "json.username",
            email: "json.email",
            phone: "json.phone",
            address1: "json.address1",
            address2: "json.address2"
        }
    }

    handleClose = () => {
        this.setState({ open: false });
    };
    handleClickOpen = () => {
        this.setState({ open: true });
    };
    getOtherUserInformation = () => {
        getOtherUser(this)
    }


    componentDidMount() {
        this.setState({userId: this.props.userId}, this.getOtherUserInformation)
    }

    render() {
        let user = this.props.user
        let type = this.props.type
        console.log(user)
        return(
            <div>
                <Button onClick={this.handleClickOpen}
                        m={2}
                        style={{
                            backgroundColor: "#C65D7B",
                            color: "white"
                        }}>
                            View {type} information
                    
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Viewer Your {type}</DialogTitle>
                <DialogContent>
                    <h3>Username: {this.state.username}</h3>
                    <p>email: {this.state.email}</p>
                    <p>phone: {this.state.phone}</p>
                    <p>Address1: {this.state.address1}</p>
                    <p>Address2: {this.state.address2}</p>
                </DialogContent>

                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Close
                    </Button>
                </DialogActions>
                </Dialog>
            </div>
        )
    }


}

export default ViewDonorAndDonee;
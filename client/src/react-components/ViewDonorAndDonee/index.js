import React from "react";
import "./styles.css";
import { Button } from "@mui/material";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getOtherUser } from "../../actions/user";
import { Link } from "react-router-dom";

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
            address2: "json.address2",
            thisUserId: ""
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
                {this.props.btnId ?

                    <Button onClick={this.handleClickOpen}
                        id={this.props.btnId }>
                        View {type} information
                    </Button>
                
                :
                    <Button onClick={this.handleClickOpen}
                        m={2}
                        style={{
                            backgroundColor: "#C65D7B",
                            color: "white"
                        }}>
                            View {type} information
                        
                    </Button>
                }
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Viewer Your {type}</DialogTitle>
                <DialogContent>
                    <Link to={'../userpage/' + this.state.thisUserId.toString()} target="_blank" >{this.state.username}  </Link>
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
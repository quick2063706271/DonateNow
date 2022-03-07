import React from "react";
import "./styles.css";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { Link } from "react-router-dom";


class RequestNowDialogue extends React.Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            open: false

        }
    }
    handleClickOpen = () => {
        this.setState({
          open: true,
        });
      };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
        this.setState({ open: false });
    }

    updateStatus = () => {
        // update status in the database

    }
    
    render() {
        const {post} = this.props
        let deliveryOption = post.deliveryOption
        let DeliveryMsg
        console.log(deliveryOption)
        return (
            <div>
                <Button id={this.props.btnId} variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Request Now
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">You are currently requesting for:</DialogTitle>
                <DialogContent>
                    <h2> {post.header} </h2>
                    <div>
                    <img className="dialogue-image" src={post.imageSrc} />
                    </div>
                    {deliveryOption === "Pickup"? <text>You will pick up this order</text> : <text>You will pay for courier to deliver this order</text>} 
                    <br/>
                    <text className="dialogue-text">By clicking on "confirm", I indicate I fully understand terms & conditions, and the consequences for failing to pay to receive the order.</text>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                    Confirm
                    </Button>
                </DialogActions>
                </Dialog>
      </div>
        );
    }

}

export default RequestNowDialogue;
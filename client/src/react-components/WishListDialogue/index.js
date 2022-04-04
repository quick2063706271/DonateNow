import React from "react";
import "./styles.css";
import database from '../../database'
import AppBar from "../AppBar";
import { uid } from "react-uid";
import Button from '@mui/material/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Navigate } from 'react-router-dom';
import StickyFooter from "../StickyFooter";


class WishListDialogue extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props)
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
        // console.log(post)
        return (
            <div>
                <Button className="postButton" id="saveButton" color="primary" onClick={this.handleClickOpen} style = {{
                            backgroundColor: "#C65D7B",
                            color: "white"
                        }}>
                Add to WishList
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Successfully Wishlisted</DialogTitle>
                <DialogContent>
                    <h2> {post.header} </h2>
                    <div>
                    <img className="dialogue-image" src={post.imageSrc} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleSubmit} color="primary">
                    OK
                    </Button>
                </DialogActions>
                </Dialog>
      </div>
        );
    }

}

export default WishListDialogue;

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
import {findPostByWishlisted} from '../../actions/post';

class WishListDialogue extends React.Component {

    constructor(props) {
        super(props);
        // console.log(props)
        this.state = {
            open: false,
            posts: [],
            userId: this.props.userId,
            wishlist: false, 
            txt: "",
            msg: ""
        }
    }

    componentDidMount(){
        findPostByWishlisted(this);
        this.checkWishlisted();
        console.log(this.state.txt)
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

    checkWishlisted = () => {
        const lst = this.state.posts.filter(post => post._id.toString() === this.props.postId)
        if (lst.length > 0){
            this.setState({
                wishlist: true,
                txt: "Remove from WishList",
                msg: "Successfully Removed From wishlist."
            })
        }else{
            this.setState({
                wishlist: false,
                txt: "Add to WishList",
                msg: "Successfully Added To WishList."
            })
        }
    }
    
    render() {
        const {post} = this.props

        return (
            <div>
                <Button id={this.props.btnId} color="primary" onClick={this.handleClickOpen} style = {{
                            backgroundColor: "#C65D7B",
                            color: "white"
                        }}>
                {this.state.txt}
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">
                    {this.state.msg}
                </DialogTitle>
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

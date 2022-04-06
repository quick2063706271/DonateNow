import React from "react";
import "./styles.css";
import Button from '@mui/material/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import {findPostByWishlisted} from '../../actions/post';
import {addWishlist, removeWishlist} from '../../actions/user';

class WishListDialogue extends React.Component {

    constructor(props) {
        super(props);
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
        findPostByWishlisted(this, 
            () => {this.checkWishlisted()});
    }

    handleClickOpen = () => {
        this.setState({
          open: true,
        }, () => {this.updateStatus()});
      };
    
    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
        this.setState({ open: false 
        }, () => {
            window.location.reload(false);
        });
    }

    updateStatus = () => {
        if (this.state.wishlist){
            removeWishlist(this.state.userId, this.props.postId, false)
        }else{
            addWishlist(this.state.userId, this.props.postId)
        }

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
        if (this.state.txt){
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
                        <img className="dialogue-image" src={this.props.imageSrc} />
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
        }else{
            return null;
        }   
    }
}

export default WishListDialogue;

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
import database from "../../database";
import { checkSession } from "../../actions/user";
import { getDoneeInformation } from "../../actions/user";
import { changeOwnerStatus } from '../../actions/post';
import { changeViewerStatus } from '../../actions/post';


class ChooseDonee extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            postId: props.postId,
            donees: [],
            choices: [],
            userId: -1,
            admin: false,
            selected: "",
            isSelected: true
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
        if (this.state.selected === "") {
            this.setState({isSelected: false})
            return
        }
        this.setState({ open: false, isSelected: true});
        changeOwnerStatus(this.state.postId, "Donation Matched")
        changeViewerStatus(this.state.postId, this.state.selected, "Request Accepted")
        for (let i = 0; i < this.state.donees.length; i++) {
            if (this.state.donees[i]._id !== this.state.selected) {
                changeViewerStatus(this.state.postId, this.state.donees[i]._id, "Failed")
            }
        }
    }

    handleChange = (e) => {
        this.setState({selected: e.target.value})
        console.log(this.state.selected)
    }

    updateStatus = () => {
        const doneesData = database.findDonees(this.props.userId, this.props.postId)
        console.log("donees:",doneesData)
        // update status in the database
        this.setState({
            choices: doneesData
        }, ()=>{console.log(this.state.choices)})
    }

    fetchDoneeInformation = () => {
        getDoneeInformation(this)
    }
    componentDidMount() {
        checkSession(this); // sees if a user is logged in
        this.setState({postId: this.props.postId}, this.fetchDoneeInformation)
    }
    
    render() {
        return (
            <div>
                <div id="choose-donee-container">
                <Button id="ChooseDonee" className={this.props.class}
                        color="primary" onClick={this.handleClickOpen}
                        m={2}
                        style={{
                            backgroundColor: "#C65D7B",
                            color: "white"
                        }}>
                Choose Your Donee
                </Button>
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                <DialogTitle id="form-dialog-title">Select Your Donee</DialogTitle>
                <DialogContent>
                    <FormControl>
                        <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={this.handleChange}
                            value={this.state.selected}
                        >
                            {this.state.donees.length > 0 ? this.state.donees.map((userData) => (
                                <FormControlLabel
                                    value={userData._id}
                                    control={<Radio />}
                                    label={(
                                        <div>
                                            <Link to={'../userpage/' + userData._id.toString()} target="_blank" >{userData.username}  </Link>
                                        </div>
                                    )}
                                />
                            )) : null}
                        </RadioGroup>
                    </FormControl>
                </DialogContent>
                <div>
                    {
                        this.state.isSelected === false ? 
                        <h3>You must select one donee to submit</h3>:
                        null
                    }
                </div>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                    Submit
                    </Button>
                </DialogActions>
                </Dialog>
      </div>
        );
    }

}

export default ChooseDonee;
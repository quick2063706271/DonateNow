import React from "react";
import "./styles.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from "@mui/material/Checkbox";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { Link } from "react-router-dom";


class ChooseDonee extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            choices: [{username: "carol#2134", post: "toys"},
                      {username: "bella#1121", post: "toys"},
                      {username: "Jayce#2134", post: "toys"}
            ]
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
    
    render() {
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                Choose Your Donee
                </Button>
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
                        >
                            {this.state.choices.map((row) => (
                                <FormControlLabel
                                    value={row.username}
                                    control={<Radio />}
                                    label={(
                                        <div>
                                            <Link to={'../userpage'} target="_blank" >{row.username}   </Link>
                                        </div>
                                    )}
                                />
                            ))}
                        </RadioGroup>
                    </FormControl>
                    {/* <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 150 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right">Username</TableCell>
                                    <TableCell align="right">item</TableCell>
                                    <TableCell align="right">Decision</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {this.state.choices.map((row) => (
                                <TableRow
                                    key={row.username}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="right">{row.username}</TableCell>
                                    <TableCell align="right">{row.post}</TableCell>
                                    <TableCell align="right"><Checkbox/></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer> */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                    Cancel
                    </Button>
                    <Button onClick={this.handleClose} color="primary">
                    Submit
                    </Button>
                </DialogActions>
                </Dialog>
      </div>
        );
    }

}

export default ChooseDonee;
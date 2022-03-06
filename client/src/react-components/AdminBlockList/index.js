import React from "react";
import "./styles.css";
import database from '../../database'
import AdminAppBar from "../AdminAppBar";
import { uid } from "react-uid";
import { Button } from '@mui/material';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import StickyFooter from "../StickyFooter";



function createData(number, username, numCom, action) {
        return { number, username, numCom, action };
    }

//// SAMPLE DATA //// to be modified
const rows = [
    createData(1, "John", 2, true),
    createData(2, "Amy", 3, true),
    createData(3, "Mike", 1, true),
    createData(4, "Kate", 2, true),
    ];

class AdminBlockList extends React.Component {

    constructor() {
        super();
        this.state = {
            isBlocked: true
        }
        this.handleBlock.bind(this);
        console.log(this.state.isBlocked)
    }

    handleBlock = event => {
        this.setState({
            accountBlocked: !this.state.accountBlocked
        });
        this.props.accountBlocked = true;
        // this.changeButtonText();
        console.log(this.state.accountBlocked);
    }

    render() {
        const users = database.users;

        let action;
        action = <Button variant="contained" display="inline-block" onClick={this.handleBlock}> {this.state.accountBlocked? "Block the User" : "⠀ ⠀ Blocked ⠀ ⠀ " } </Button>

        return (

            <div>
                <AdminAppBar/>
                <div className="blocklist">
                    <div className="header">
                        <h1><b>All Blocked Users:</b></h1>
                    </div>

                </div>
               <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Number</TableCell>
                      <TableCell align="center">Username</TableCell>
                      <TableCell align="center">#Complaint Received</TableCell>
                      <TableCell align="center">Action to Take</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.number}>
                        <TableCell align="center" component="th" scope="row">
                          {row.number}
                        </TableCell>
                        <TableCell align="center">{row.username}</TableCell>
                        <TableCell align="center">{row.numCom}</TableCell>
                        <TableCell align="center">{action}</TableCell>
                        {/*<TableCell align="center">{row.action}</TableCell>*/}

                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>`

              <div>
                  <StickyFooter/>
              </div>

            </div>


         );
    }

}

export default AdminBlockList;

import React from "react";
import "./styles.css";
import database from '../../database'
import AdminAppBar from "../AdminAppBar";
import { uid } from "react-uid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

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

    render() {
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
                        <TableCell align="center">{row.action}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>`
            </div>
            
         );
    }

}

export default AdminBlockList;

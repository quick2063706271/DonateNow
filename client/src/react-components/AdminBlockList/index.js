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

class AdminBlockList extends React.Component {
  
  constructor() {
      super();
      this.state = {
        users: database.users,
      }
  }

  /*initStateInfo = () =>{
    this.setState({
        users: database.users,
      }, () => console.log(this.state))
  }

  componentDidMount() {
    this.initStateInfo();
  }*/

  handleBlock = (event, value) => {
    event.preventDefault();
    for (const [k, v] of Object.entries(this.state.users)) {
      if (v.userId === value.userId) {
        const blocked = database.users[k].accountBlocked
        database.users[k].accountBlocked = !blocked
        this.setState({
          users: database.users,
        }, () => console.log(this.state))
      }
    }
    console.log(database.users)
  }

  render() {
    return (
      <div>
          <AdminAppBar handleSearchButtonOnClick={this.props.handleSearchButtonOnClick}/>
          <div className="blocklist">
            <div className="header">
                <h1><b>Block List</b></h1>
            </div>
            <div className="App">
              <table>
                <tbody>
                  <tr>
                    <th>UserId</th>
                    <th>Username</th>
                    <th>Is Blocked?</th>
                    <th>Block the User</th>
                  </tr>
                  {this.state.users.map((value, key) => {
                    return (
                      <tr key={key}>
                        <td>{value.userId}</td>
                        <td>{value.username}</td>
                        <td>{value.accountBlocked.toString()}</td>
                        <td><button type="submit" id="blockButton" onClick={(event) => this.handleBlock(event, value)}> {value.accountBlocked ? "Unblock" : "Block" } </button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
            

        <div>
            <StickyFooter/>
        </div>

      </div>


    );
  }

}

export default AdminBlockList;

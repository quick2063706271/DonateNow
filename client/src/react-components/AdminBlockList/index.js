import React from "react";
import "./styles.css";
import database from '../../database'
import AdminAppBar from "../AdminAppBar";
import { Link, Navigate } from 'react-router-dom';
import { uid } from "react-uid";
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
  }

  handleUserIdOnClick = (value) => {
    this.setState({
        redirectUserId: value.userId
    }, () => {
        this.setState({
            redirect: true
        })
    }, () => console.log(this.state))
  }

  render() {
    return (
      <div>
          {this.state.redirect ? <Navigate to={`/userpage/${this.state.redirectUserId}`}/> : null}
          <AdminAppBar handleSearchButtonOnClick={this.props.handleSearchButtonOnClick}/>
          <div className="blocklist">
            <div className="header">
                <h1><b>Block List</b></h1>
            </div>
            <div className="blocklistTable">
              <table>
                <tbody>
                  <tr className="header-tr">
                    <th>UserId</th>
                    <th>Username</th>
                    <th>Account Blocked</th>
                    <th>Action</th>
                  </tr>
                  {this.state.users.map((value, key) => {
                    return (
                      <tr key={key} className="rt-tr-group">
                        <td>{value.userId}</td>
                        <td onClick={this.handleUserIdOnClick.bind(this, value)}><u>{value.username}</u></td>
                        <td>{value.accountBlocked.toString()}</td>
                        <td className="buttonRow"><button type="submit" className="blockButton" onClick={(event) => this.handleBlock(event, value)}> {value.accountBlocked ? "Unblock" : "Block" } </button></td>
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

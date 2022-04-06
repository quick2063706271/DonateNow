import React from "react";
import "./styles.css";
//import database from '../../database'
import AdminAppBar from "../AdminAppBar";
import { Navigate } from 'react-router-dom';
import StickyFooter from "../StickyFooter";
import { checkSession } from "../../actions/user";
import { getBlocklist, updateBlocklist } from "../../actions/blocklist";

class AdminBlockList extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
        userId: "", 
        admin: false,
        users: []
    }
  }

  componentDidMount() {
      checkSession(this, () => getBlocklist(this));
  }

  handleBlock = (event, value) => {
    event.preventDefault();
    updateBlocklist(this, value)
  }

  handleUserIdOnClick = (value) => {
    this.setState({
        redirectUserId: value._id
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
                    <th>Email</th>
                    <th>Account Blocked</th>
                    <th>Action</th>
                  </tr>
                  {this.state.users.map((value, key) => {
                    return (
                      <tr key={key} className="rt-tr-group">
                        <td>{value._id}</td>
                        <td className="userEmail" onClick={this.handleUserIdOnClick.bind(this, value)}><u>{value.email}</u></td>
                        <td>{value.accountBlocked.toString()}</td>
                        <td className="buttonRow"><button type="submit" className="blockButton" onClick={(event) => this.handleBlock(event, value)}> {value.accountBlocked ? "Unblock" : "Block" } </button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <br></br>
          <br></br>

          <div>
              <StickyFooter/>
          </div>
      </div>
    );
  }

}

export default AdminBlockList;

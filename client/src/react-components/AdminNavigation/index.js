import React from "react";
import "./styles.css";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

class AdminNavigation extends React.Component {
    render() {
      return (
        <div className="navigationMenu">
            <nav>
                <div>
                    <ul>
                        <li>
                            <Link Link to={'/admin/blocklist'}>
                            <Button variant="outlined">Block List</Button>
                            </Link>
                        </li>
                        <li>
                            <Link Link to={'/admin/feedback'}>
                            <Button variant="outlined">View Feedback</Button>
                            </Link>
                        </li>
                        <li>
                            
                            <Button variant="outlined">Admin Mode</Button>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

      );
    }
  }



export default AdminNavigation;

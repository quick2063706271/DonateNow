import React from "react";
import "./styles.css";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

class NavigationMenu extends React.Component {
    render() {
      return (
        <div className="navigationMenu">
            <nav>
                <div>
                    <ul>
                        <li>
                            <Link Link to={'/createpost'}>
                            <Button style = {{backgroundColor: "#ffbeba", color: "white"}}>Donate Now</Button>
                            </Link>
                        </li>
                        <li>
                            <Link Link to={'/wishlist'}>
                            <Button style = {{backgroundColor: "#ffbeba", color: "white"}}>Wish List</Button>
                            </Link>
                        </li>
                        <li>
                            <Link Link to={'/userpage'}>
                            <Button style = {{backgroundColor: "#ffbeba", color: "white"}}>My Profile</Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        
      );
    }
  }



export default NavigationMenu;
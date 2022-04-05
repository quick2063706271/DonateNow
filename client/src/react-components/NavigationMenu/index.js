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
                    <ul className="buttons">
                        <li>
                            <Link Link to={'/createpost'}>
                            <Button style = {{backgroundColor: "#C65D7B", color: "white", fontSize: "16px"}}>Donate Now</Button>
                            </Link>
                        </li>
                        <li>
                            <Link Link to={'/wishlist'}>
                            <Button style = {{backgroundColor: "#C65D7B", color: "white", fontSize: "16px"}}>Wish List</Button>
                            </Link>
                        </li>
                        <li>
                            <Link Link to={'/userpage'}>
                            <Button style = {{backgroundColor: "#C65D7B", color: "white", fontSize: "16px"}}>My Profile</Button>
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
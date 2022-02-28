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
                            <Button variant="outlined">Donate Now</Button>
                            </Link>
                        </li>
                        <li>
                            <Link Link to={'/wishlist'}>
                            <Button variant="outlined">Wish List</Button>
                            </Link>
                        </li>
                        <li>
                            <Link Link to={'/userpage'}>
                            <Button variant="outlined">My Profile</Button>
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
import React from "react";
import "./styles.css";

class NavigationMenu extends React.Component {
    render() {
      return (
        <div className="navigationMenu">
            <nav>
                <div>
                    <ul>
                        <li>
                            <a>Donate Now</a>
                        </li>
                        <li>
                            <a>Wish List</a>
                        </li>
                        <li>
                            <a>My Profile</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        
      );
    }
  }


export default NavigationMenu;
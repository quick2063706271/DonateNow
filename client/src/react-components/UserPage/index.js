import React from "react";
import "./styles.css";
import PersonalInformation from "../PersonalInformation";
import NavigationMenu from "../NavigationMenu";
import SideMenu from "../SideMenu";

class UserPage extends React.Component {
    render() {
        return (
            <div>
                <NavigationMenu/>
                <SideMenu/>
                <PersonalInformation/>
            </div>
        );
    }

}

export default UserPage;
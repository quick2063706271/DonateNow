import React from 'react';
import "./styles.css";
import { Button } from '@mui/material';
import PersonalInformation from '../PersonalInformation';
import Feedback from '../Feedback';
// to-do: change

class SideMenu extends React.Component{
    constructor() {
        super();
        this.state = {
            selectedPanel: 0
        }
    }

    handleClick = (event) => {
        console.log(event.target.innerText)
        let panel = 0
        if (event.target.innerText === 'MY INFORMATION') {
            panel = 0
        } else if (event.target.innerText === 'TRANSACTION HISTORY') {
            panel = 1
        } else if (event.target.innerText == "DONATED HISTORY") {
            panel = 2
        } else {
            panel = 3
        }
        this.setState({
            selectedPanel: panel
        })
    }

    render () {
        let panel
        if (this.state.selectedPanel === 0) {
            panel = <PersonalInformation/>
        } else if (this.state.selectedPanel == 3) {
            panel = <Feedback/>
        }

        return (
            <div>
            <div className="side-menu">
                <div className="side-menu-container">
                    <Button variant={this.state.selectedPanel === 0 ? "contained" : "text"} onClick={this.handleClick} size="large">MY INFORMATION</Button>
                    <Button variant={this.state.selectedPanel === 1 ? "contained" : "text"} onClick={this.handleClick} size="large">TRANSACTION HISTORY</Button>
                    <Button variant={this.state.selectedPanel === 2 ? "contained" : "text"} onClick={this.handleClick} size="large">DONATED HISTORY</Button>
                    <Button variant={this.state.selectedPanel === 3 ? "contained" : "text"} onClick={this.handleClick} size="large">SUBMIT FEEDBACK</Button>
                </div>
            </div>
            <div>
                {panel}
            </div>
            </div>
          )
    }
  
}



export default (SideMenu); 
import React from 'react';
import "./styles.css";
import { Button } from '@mui/material';
import PersonalInformation from '../PersonalInformation';
import Feedback from '../Feedback';
import History from '../History';
import monitor from '../../monitor.png'
import toys from "../../toys.png"
import marker from "../../marker.png"
import bottle from "../../bottle.png"
// to-do: change

class SideMenu extends React.Component{
    constructor() {
        super();
        this.state = {
            selectedPanel: 0,
            transactionPosts: [
                { header: "Toys for Kids 5-6 Year Olds", 
                  status: "request accepted",
                  date: "2021-02-01",
                  img: toys
                },
                { header: "Monitor", 
                  status: "Failed",
                  date: "2021-02-02",
                  img: monitor
                }
            ],
            donatedPosts: [
                { header: "Marker", 
                  status: "Requested",
                  date: "2021-02-03",
                  img: marker
                },
                { header: "Bottle", 
                  status: "Order Placed",
                  date: "2021-02-02",
                  img: bottle
                }
            ],
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
        } else if (this.state.selectedPanel == 1) {
            panel = <History items={this.state.transactionPosts}/>
        } else if (this.state.selectedPanel == 2) {
            panel = <History items={this.state.donatedPosts}/>
        } else if (this.state.selectedPanel == 3) {
            panel = <Feedback/>
        } else {
            panel = <PersonalInformation/>
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
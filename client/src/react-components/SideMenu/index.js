import React from 'react';
import "./styles.css";
import { Button } from '@mui/material';

function SideMenu() {
  return (
    <div className="side-menu">
        <div className="side-menu-container">
            <Button variant="text" size="large">My information</Button>
            <Button variant="text" size="large">Donated History</Button>
            <Button variant="text" size="large">Credit Score</Button>
            <Button variant="text" size="large">Submit Feedback</Button>
        </div>
    </div>
  );
}



export default (SideMenu);
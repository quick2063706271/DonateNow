import React from "react";
import "./styles.css";
import database from '../../database';
import AppBar from "../AppBar";
import { uid } from "react-uid";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import StickyFooter from '../StickyFooter';


class TermsConditions extends React.Component {
    render() {
        return (

            <div>
                <AppBar/>
                <div className="termsconditions">
                    <div className="header">
                        <h1><b>Terms and Conditions</b></h1>
                    </div>

                </div>

                <StickyFooter/>
            </div>

        );
    }

}

export default TermsConditions;

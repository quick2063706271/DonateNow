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

        function Term(props) {
            return <li> { props.content } <br/></li>;
        }


        const terms = database.allterms;

        return (
            <div>
                <AppBar/>

                <div className="termsconditions">
                    <div className="header">
                        <h1><b>Terms and Conditions:</b></h1>
                    </div>

                    <div className="block">
                        <div className="post">
                            <div className="summary">
                                <ul>
                                    <li><h3>{terms.map((term) => <Term key={term.id} content={term.content} />)  }  </h3></li>
                                </ul>

                                <br></br>
                                <br></br>
                            </div>
                        </div>
                    </div>

                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>

                </div>

                <StickyFooter/>
            </div>
        );
    }

}

export default TermsConditions;

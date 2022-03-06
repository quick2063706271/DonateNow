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
            return <li> { props.content }</li>;
        }

        // const  = [
        //     {id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis condimentum consectetur. Etiam et interdum urna. Suspendisse maximus egestas hendrerit.'},
        //     {id: 2, content: 'Fusce elementum lectus et magna vestibulum, at blandit nibh pellentesque.'},
        //     {id: 3, content: 'Phasellus rhoncus laoreet dictum. Nullam consectetur justo ut lectus sodales, a lacinia magna aliquet. '}
        // ];

        const terms = database.allterms;

        return (

            <div>
                <AppBar/>
                <div className="termsconditions">
                    <div className="header">
                        <h1><b>Terms and Conditions</b></h1>
                    </div>

                </div>


                <div className="termslist">
                    <nav>
                        <ul>
                            <h3>{terms.map((term) => <Term key={term.id} content={term.content} />)}</h3>
                        </ul>
                    </nav>
                </div>

                <StickyFooter/>
            </div>

        );
    }

}

export default TermsConditions;

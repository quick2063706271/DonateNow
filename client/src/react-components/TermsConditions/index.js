import React from "react";
import "./styles.css";
// import database from '../../database';
import AppBar from "../AppBar";
import StickyFooter from '../StickyFooter';
import { getTermsConditions } from "../../actions/termsconditions";

class TermsConditions extends React.Component {


    constructor() {
        super()
        this.state = {
            terms: []
        }
    }

    componentDidMount() {
        getTermsConditions(this)
    }

    render() {

        function Term(props) {
            return <li className="term"> { props.content } <br/></li>;
        }

        // const terms = database.allterms;

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
                                    <li>
                                        <h3>
                                            {this.state.terms.map((term) => <Term key={term._id} content={term.terms} />)}
                                        </h3>
                                    </li>
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



                </div>

                <StickyFooter/>
            </div>
        );
    }

}

export default TermsConditions;

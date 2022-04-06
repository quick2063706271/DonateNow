import React from "react";
import "./styles.css";
import AppBar from "../AppBar";
import StickyFooter from '../StickyFooter';
import { getFaqs } from "../../actions/faq";


class FAQpage extends React.Component {

    constructor() {
        super()
        this.state = {
            faqs: []
        }
    }

    componentDidMount() {
        getFaqs(this)
    }

    // renderFaqs(header, description) {
    //     const content = []
    // }

    render() {

        function Faq(props) {
            return <ul className="faq"><li className="question"> { props.question }</li> <br/> <li className="answer"> { props.answer }</li> </ul>;
        }

        //const faqs = database.allfaqs;

        return (
            <div>
                <AppBar/>

                <div className="faqpage">
                    <div className="header">
                        <h1><b>FAQs (Frequently Asked Questions):</b></h1>
                    </div>

                    <div className="block">
                        <div className="post">
                            <div className="summary">
                                <ul>
                                    <li><h3>{this.state.faqs.map((faq) => <Faq key={faq._id} question={faq.question} answer={faq.answer} />)}</h3></li>
                                </ul>

                                <br></br>
                                <br></br>
                            </div>

                            <br></br>
                            <br></br>
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

export default FAQpage;

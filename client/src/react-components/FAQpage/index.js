import React from "react";
import "./styles.css";
import database from '../../database';
import PostPageHelp from '../PostPagehelp';
import AppBar from '../AppBar';

class FAQpage extends React.Component {
    render() {
        return (

            <div>
                <AppBar/>
                <div className="faqpage">
                    <div className="header">
                        <h1><b>FAQs (Frequently Asked Questions):</b></h1>
                    </div>

                </div>

            </div>

        );
    }

}

export default FAQpage;

import React from "react";
import "./styles.css";
import database from '../../database';
import PostPageHelp from '../PostPagehelp';
import AppBar from '../AppBar';
import StickyFooter from '../StickyFooter';


class FAQpage extends React.Component {
    render() {

        function Faq(props) {
            return <li> { props.content }</li>;
        }

        // const faqs = [
        //     {id: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque venenatis condimentum consectetur. Etiam et interdum urna. Suspendisse maximus egestas hendrerit.'},
        //     {id: 2, content: 'Fusce elementum lectus et magna vestibulum, at blandit nibh pellentesque.'},
        //     {id: 3, content: 'Phasellus rhoncus laoreet dictum. Nullam consectetur justo ut lectus sodales, a lacinia magna aliquet. '}
        // ];

        const faqs = database.allfaqs;

        return (

            <div>
                <AppBar/>
                <div className="faqpage">
                    <div className="header">
                        <h1><b>FAQs (Frequently Asked Questions):</b></h1>
                    </div>
                </div>

                <div className="faqlist">
                    <nav>
                        <div>
                            <h3>{faqs.map((faq) => <Faq key={faq.id} content={faq.content} />)}</h3>
                        </div>
                    </nav>
                </div>

                <StickyFooter/>

            </div>

        );
    }

}

export default FAQpage;

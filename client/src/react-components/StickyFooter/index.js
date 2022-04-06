import React from "react";
import "./styles.css";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


class StickyFooter extends React.Component {


    render() {

        function Footer({ children }) {
            return (
                <div>
                    <div className = "phantom" />
                    <div className = "style">
                        { children }
                    </div>
                </div>
            )
        }

        let footerChildren;
        footerChildren = <div className="footerMenu">
                <div>
                    <ul>

                            <Link Link to={'/FAQpage'}>
                            {/*<Button id="faqBtn" variant="outlined" style={{backgroundColor: "#ffbeba", color: "white"}}>FAQ Page</Button>*/}
                            <Button id="faqBtn" style = {{backgroundColor: "#C65D7B", color: "white", fontSize: "16px"}}>FAQ Page</Button>
                            </Link>


                            <Link Link to={'/TermsConditions'}>
                            {/*<Button id="termsBtn" variant="outlined" style={{backgroundColor: "#ffbeba", color: "white"}}>Terms and Conditions</Button>*/}
                            <Button id="termsBtn" style = {{backgroundColor: "#C65D7B", color: "white", fontSize: "16px"}}>Terms and Conditions</Button>
                            </Link>

                    </ul>
                </div>
        </div>


        return (

            <div>
            <Footer>
                {footerChildren}
            </Footer>
            </div>

        );
    }

}

export default StickyFooter;

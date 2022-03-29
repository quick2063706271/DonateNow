import React from "react";
import "./styles.css";
import database from '../../database';
import FAQpage from '../FAQpage';
import TermsConditions from '../TermsConditions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { borderBottom, borderLeft, borderRight } from "@mui/system";



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
                            <Button id="faqBtn" variant="outlined" style={{backgroundColor: "#ffbeba", color: "white"}}>FAQ Page</Button>
                            </Link>


                            <Link Link to={'/TermsConditions'}>
                            <Button id="termsBtn" variant="outlined" style={{backgroundColor: "#ffbeba", color: "white"}}>Terms and Conditions</Button>
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

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
                    <div style={phantom} />
                    <div style={style}>
                        { children }
                    </div>
                </div>
            )
        }

        var style = {
            backgroundColor: "#F8F8F8",
            // borderTop: "1px solid #E7E7E7",
            textAlign: "center",
            //padding: "20px",
            position: "fixed",
            left: "0",
            bottom: "0",
            height: "65px",
            width: "100%",
        }

        var phantom = {
          display: 'block',
          //height: '10px',
          //margin-bottom: '10px', 
          width: '100%',
        }

        let footerChildren, stickyfooter;
        footerChildren = <div className="footerMenu">
            <nav>
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
            </nav>
        </div>

        //stickyfooter = Footer({ footerChildren })
        //
        // //stickyfooter = "123";

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

import React from "react";
import "./styles.css";
import database from '../../database';
import FAQpage from '../FAQpage';
import TermsConditions from '../TermsConditions';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';


var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}

var phantom = {
  display: 'block',
  padding: '20px',
  height: '60px',
  width: '100%',
}

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

class StickyFooter extends React.Component {

    render() {

        let footerChildren, stickyfooter;
        footerChildren = <div className="navigationMenu">
            <nav>
                <div>
                    <ul>
                        <li>
                            <Link Link to={'/FAQpage'}>
                            <Button variant="outlined">FAQ Page</Button>
                            </Link>
                        </li>
                        <li>
                            <Link Link to={'/TermsConditons'}>
                            <Button variant="outlined">Terms and Conditions</Button>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        stickyfooter = Footer({ footerChildren })

        //stickyfooter = "123";

        return (

            <div>
                {stickyfooter}
            </div>

        );
    }

}

export default StickyFooter;

import React from "react";
import "./styles.css";
import { Button } from "@material-ui/core";
import AppBar from "../AppBar";
import { uid } from "react-uid";
import StickyFooter from "../StickyFooter";
import { Link } from 'react-router-dom';

class ErrorPage extends React.Component {
    render() {
        return (
            <div>
                <AppBar/>

                <div className="error">
                    <div className="header">
                        <h1><b>404 ERROR</b></h1>
                    </div>
                    <h2>Page not found. Please re-check your URL or click on the button below to be redirected to the home page.</h2>
                </div>

                <div>
                <Link Link to={'/'}>

                    <Button variant="contained" display="inline-block">
                        <h2>{"Back to Home Page"}</h2>
                    </Button>
                </Link>
                </div>

              <div>
                  <StickyFooter/>
              </div>
            </div>
        );
    }

}

export default ErrorPage;

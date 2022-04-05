import React from "react";
import "./styles.css";
import { Button } from "@material-ui/core";
import AppBar from "../AppBar";
import StickyFooter from "../StickyFooter";
import { Link } from 'react-router-dom';

class ErrorPage extends React.Component {
    render() {
        return (
            <div>
                <AppBar/>

                <div className="errorpage">

                    <div className="block">
                        <div className="post">
                            <div className="summary">
                                <div className="header">
                                        <h1><b>404 ERROR</b></h1>
                                </div>
                                <h2>Page not found. Please re-check your URL or click on the button below to be redirected to the home page.</h2>

                                <div className="button">
                                    <Link Link to={'/'}>
                                        <Button variant="contained" display="inline-block">
                                            <h2>{"Back to Home Page"}</h2>
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <StickyFooter/>
            </div>
        );
    }

}

export default ErrorPage;

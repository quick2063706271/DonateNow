import React from "react";
import "./styles.css";
import database from '../../database'
import AdminAppBar from "../AdminAppBar";
import { uid } from "react-uid";
import StickyFooter from "../StickyFooter";

class AdminFeedback extends React.Component {
    render() {
        return (
            <div>
                <AdminAppBar/>
                <div className="blocklist">
                    <div className="header">
                        <h1><b>All User Feedbacks:</b></h1>
                    </div>
                </div>

              <div>
                  <StickyFooter/>
              </div>

            </div>
        );
    }

}

export default AdminFeedback;

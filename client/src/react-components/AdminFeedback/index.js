import React from "react";
import "./styles.css";
import database from '../../database'
import AdminAppBar from "../AdminAppBar";
import { uid } from "react-uid";
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import StickyFooter from "../StickyFooter";

// class AdminFeedback extends React.Component {
//     render() {
//         return (
//             <div>
//                 <AdminAppBar/>
//                 <div className="blocklist">
//                     <div className="header">
//                         <h1><b>All User Feedbacks:</b></h1>
//                     </div>
//                 </div>
//
//
//                 <div>
//                     //{this.loopThroughFeedback()}
//                 </div>
//
//               <div>
//                   <StickyFooter/>
//               </div>
//
//             </div>
//         );
//     }
//
// }

class AdminFeedback extends React.Component {

    // state = {
    //     feedbacks: {},
    //     feedbackId: [1,2],
    // };

    /*getFeedback = (feedback) => {
        return this.state.feedbackId;
    }*/


    /*loopThroughFeedback = () => {

        for (const [key, value] of Object.entries(this.state.feedbacks)) {
            console.log(`${key}: ${value}`);
            for (const [k, v] of Object.entries(value)) {
                console.log(`${k}: ${v}`);
                console.log(value.imageSrc);
                return (<div>{value.categories}</div>);
            }
        }
    }*/


    render() {
        let action;
        action = <Button variant="contained" display="inline-block" onClick={this.handleBlock}> {this.state.isResolved? "Feedback Resolved" : "⠀ ⠀ Unresolved ⠀ ⠀ " } </Button>

        function eachFeedback(props) {
            return <div className="block">
                <p className="title"><b><u>{props.title}</u></b></p>
                <div className="feedback">
                        <ul>
                            <li>{props.userId}</li>
                        </ul>
                        <ul>
                            <li>{props.content}</li>
                            <li>{action}</li>
                        </ul>

                </div>
            </div>;
        }

        const feedbacks = database.feedbacks;


        return (
            <div>
                <AdminAppBar/>

                <div className="feedback">
                    <div className="header">
                        <h1><b>All User Feedbacks:</b></h1>
                    </div>
                    {/*this.loopThroughPosts()*/}
                </div>

                <div className="termslist">
                    <nav>
                        <ul>
                            <h3>{feedbacks.map((feedback) => <eachFeedback key={feedback.id} content={feedback.content} />)}</h3>
                        </ul>
                    </nav>
                </div>

                <div>
                    <StickyFooter/>
                </div>
            </div>
        );
    }

}

export default AdminFeedback;

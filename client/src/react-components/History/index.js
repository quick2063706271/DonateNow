import "./styles.css"
import React from "react";
import { uid } from "react-uid";
import HistoryItem from "../HistoryItem";

class History extends React.Component {
    constructor() {
        super()
    }
    render() {
        const {items} = this.props;
        return (
            <div id="history-container">
                {items.map((item) => (<HistoryItem 
                                        key={uid(item)} 
                                        header={item.header} 
                                        status={item.viewerStatus} 
                                        date={item.date}
                                        img={item.img_src}
                                    />)
                )}
            </div>
        )
    }
}

export default History;
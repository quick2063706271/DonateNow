import "./styles.css"
import React from "react";
import { uid } from "react-uid";
import HistoryItem from "../HistoryItem";

class History extends React.Component {
    constructor() {
        super()
    }
    render() {
        const {items, category} = this.props;
        let histories
        if (items.length === 0) {
            histories = <div id="history-container"></div>
        } else {
            histories = <div id="history-container">
                            {items.map((item) => (<HistoryItem 
                                                    key={uid(item)} 
                                                    header={item.header} 
                                                    status={category === "transaction" ? item.viewerStatus: item.ownerStatus} 
                                                    date={item.requestDate}
                                                    img={item.img_src}
                                                />)
                            )}
                        </div>
        }
        return (
            histories
        )
    }
}

export default History;
import React from "react";
import HistoryItem from "../HistoryItem";

class TransactionHistory extends React.Component {
    constructor() {
        super()
    }
    render() {
        const {items} = this.props;
        return (
            <div>
                {items.map(

                )}
            </div>
        )
    }
}
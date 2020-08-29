import React from "react";
import Card from "./Card";

function CardList(props) {
    return (
        <div>
            {props.cards.map(c => <Card text={c.text}/>)}
        </div>
        
    )
}

export default CardList;

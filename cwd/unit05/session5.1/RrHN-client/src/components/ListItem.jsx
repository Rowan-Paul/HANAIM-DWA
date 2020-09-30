import React from 'react'
import { Link } from "react-router-dom";

export default function ListItem(props) {
    return (
        <div className="Item">
            <div className="mainInfo">
                <ItemHeader select={props.select} item={props.item} status={props.status} />
                <ItemFooter item={props.item} />
            </div>
        </div>
    )
};

function ItemHeader(props) {
    const handleTitleClick = (event) => {
        props.select(props.item);
    };
    let titleStyle
    if (props.status === 'read') {
        titleStyle = { color: 'grey' }
    } else if (props.status === 'new') {
        titleStyle = { color: 'orange' }
    } else if (props.status === 'seen') {
        titleStyle = { color: 'black' }
    }

    return (
        <div>
            <Link className="itemTitle" onClick={handleTitleClick} to={"/item/"+props.item.id} style={titleStyle} >
                {props.item.title}
            </Link>
            <span className="domain"> ()</span>
        </div>
    );
};

function ItemFooter(props) {
    const date = new Intl.DateTimeFormat('en-US').format(new Date(props.item.time * 1000));

    return (
        <div className="info">
            {props.item.score} points
            <span className="divider">|</span>
        by {props.item.by}
            <span className="divider">|</span>
            {date}
            <span className="divider">|</span>
            <a className="comments" href={'https://news.ycombinator.com/item?id=' + props.item.id}><strong>{props.item.descendants}</strong> comments</a>
        </div>
    )
}
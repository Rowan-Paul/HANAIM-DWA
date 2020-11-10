import React from 'react'

export default function ListItem (props) {
    return (
        <div className="Item">
            <div className="mainInfo">
            <ItemHeader select={props.select} item={props.item} />
            <ItemFooter item={props.item} />
        </div>
    </div>
)};

function ItemHeader(props) {
    const handleTitleClick = (event) => {
        event.preventDefault();
        props.select(props.item.url);
    };

    return (
    <div>
        <a className="itemTitle" onClick={handleTitleClick} href={props.item.url}>
            {props.item.title}
        </a>
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
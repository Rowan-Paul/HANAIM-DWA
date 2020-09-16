import React from 'react'

export default function listItem(props) {
    const date = new Intl.DateTimeFormat('en-US').format(new Date(props.item.time * 1000));

    return <div className="Item">
        <div className="mainInfo">
        <div>
            <a className="itemTitle" href={props.item.url}>{props.item.title}</a>
                <span class="domain">(github.com)</span>
            </div>
            <div className="info">
                {props.item.score}
                <span className="divider">|</span>
                {props.item.by}
                <span className="divider">|</span>
                {date}
                <span className="divider">|</span>
                <a className="comments" href="https://news.ycombinator.com/item?id=12115187"><strong>{props.item.descendants}</strong> comments</a>
            </div>
        </div>
    </div>
}
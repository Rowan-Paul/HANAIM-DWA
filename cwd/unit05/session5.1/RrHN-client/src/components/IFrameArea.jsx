import React from 'react';

export default function IFrameArea (props) {
    const foundItem = props.items.find(item => Number(item.id) === Number(props.match.params.id))    
    console.log(foundItem)
    if(foundItem) {
        return <iframe className="IFrameView" title={foundItem.title} src={foundItem.url} frameBorder="0" sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin"></iframe>
    } else {
        return ''
    }
}
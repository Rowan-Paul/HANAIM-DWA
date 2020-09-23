import React from 'react';

export default function IFrameArea (props) {
    return <iframe className="IFrameView" title={props.title} src={props.url} frameBorder="0" sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin"></iframe>
}
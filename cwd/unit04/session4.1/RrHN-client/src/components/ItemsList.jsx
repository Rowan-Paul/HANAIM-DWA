import React from 'react'
import ListItem from './ListItem'

export default function ItemsList(props) {
    if(props.listSize <= 0 || props.listSize > 500) {
        return <h2>Something went wrong!</h2>
    } else {
        const listItems = props.data.slice(0, props.listSize).map((item) => {
            return <ListItem select={props.select} key={item.id} item={item} />
        });
    
        return listItems;
    }
}
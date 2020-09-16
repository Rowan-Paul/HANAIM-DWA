import React from 'react'
import ListItem from './ListItem'

export default function ListItems (props) {
    const listItems = props.data.map((item) => {
       return <ListItem select={props.select} key={item.id} item={item} />
    });

    return listItems;
}
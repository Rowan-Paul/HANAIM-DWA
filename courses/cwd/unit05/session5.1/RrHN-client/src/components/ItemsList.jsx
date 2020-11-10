import React from 'react'
import ListItem from './ListItem'

export default class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        if (this.props.listSize <= 0 || this.props.listSize > 500) {
            return <h2>Something went wrong!</h2>
        } else {
            const listItems = this.props.data.slice(0, this.props.listSize).map((item) => {
                const itemStatus = this.props.itemStatuses[item.id];
                return <ListItem status={itemStatus ? itemStatus : 'new'} select={this.props.select} key={item.id} item={item} />
            });

            return listItems;
        }
    }
}
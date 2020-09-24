import React from 'react'
import ListItem from './ListItem'

export default class ItemsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            itemStatuses: []
        }
    }

    async componentDidMount() {
        try {
            const data = await fetch("http://localhost:3000/itemStatuses")
            const parsedData = await data.json();
            this.setState((itemStatuses) => ({ itemStatuses: parsedData }))
        } catch (err) {
            console.log(err); // Failed to fetch
        }
    }

    render() {
        if (this.props.listSize <= 0 || this.props.listSize > 500) {
            return <h2>Something went wrong!</h2>
        } else {
            const listItems = this.props.data.slice(0, this.props.listSize).map((item) => {
                const itemStatus = this.state.itemStatuses[item.id];
                return <ListItem status={itemStatus ? itemStatus : 'new'} select={this.props.select} key={item.id} item={item} />
            });

            return listItems;
        }
    }
}
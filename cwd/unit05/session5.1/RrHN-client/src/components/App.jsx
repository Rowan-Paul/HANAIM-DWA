import React from 'react'
import { Switch, Route, Link } from "react-router-dom";

import IFrameArea from './IFrameArea';
import ListItems from './ItemsList';
import Preferences from './Preferences';
import EmptyPanel from './EmptyPanel';

export class RrHNApp extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         items: [],
         itemStatuses: [],
         preferences: {
            color: 'orange',
            listSize: 8
         }
      }
   }

   markAsSeen = async () => {
      const listItems = this.state.items.slice(0, this.state.preferences.listSize).map(async (item) => {
         if(this.state.itemStatuses[item.id] !== 'read') {
            try {
               const data = await fetch("http://localhost:3000/itemStatuses/" + item.id, {
                  method: 'PUT',
                  body: 'seen'
               })
      
               this.setState(() => ({
                  itemStatuses: {...this.state.itemStatuses, [`${item.id}`]: 'seen'}
               }))
            } catch (err) {
               console.log(err); // Failed to fetch
            }
         }
     });
   }

   onSelectItem = async (item) => {
      try {
         const data = await fetch("http://localhost:3000/itemStatuses/" + item.id, {
            method: 'PUT',
            body: 'read'
         })

         this.setState(() => ({
            itemStatuses: {...this.state.itemStatuses, [`${item.id}`]: 'read'}
         }))
      } catch (err) {
         console.log(err); // Failed to fetch
      }

      this.setState(() => ({
         selectedItem: item.url
      }));
   }

   async componentDidMount() {
      try {
         const statusData = await fetch("http://localhost:3000/itemStatuses")
         const statusParsedData = await statusData.json();
         this.setState((itemStatuses) => ({ itemStatuses: statusParsedData }))
         console.log("Data received")
      } catch (err) {
         console.log(err);
      }

      try {
         const itemData = await fetch("http://localhost:3000/hn/topstories")
         const itemParsedData = await itemData.json();
         this.setState((items) => ({ items: itemParsedData }))
         console.log("Items received")
      } catch (err) {
         console.log(err);
      }
   }

   setColor(color) {
      this.setState((state) => (
         { preferences: { ...state.preferences, color: color } }
      )
      )
   }
   setListSize(size) {
      this.setState((state) => (
         { preferences: { ...state.preferences, listSize: size } }
      )
      )
   }

   render() {
      const boundSetColor = (c) => this.setColor(c)
      const boundSetListSize = (c) => this.setListSize(c)
      const boundDialogClickHandler = () => this.dialogClickHandler()

      return (
         <div className={`App ${this.state.preferences.color}`}>
            <div id="ListPanel">
               <div className="ItemList">
                  <div className="Logo">
                     <div className="colored">
                        RRHN
                     </div>

                     <div className="title">
                        Hacker News
                     </div>


                     <span className="settingsIcon">
                        <Link to="/preferences">
                           <svg width="20" height="20" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1152 896q0-106-75-181t-181-75-181 75-75 181 75 181 181 75 181-75 75-181zm512-109v222q0 12-8 23t-20 13l-185 28q-19 54-39 91 35 50 107 138 10 12 10 25t-9 23q-27 37-99 108t-94 71q-12 0-26-9l-138-108q-44 23-91 38-16 136-29 186-7 28-36 28h-222q-14 0-24.5-8.5t-11.5-21.5l-28-184q-49-16-90-37l-141 107q-10 9-25 9-14 0-25-11-126-114-165-168-7-10-7-23 0-12 8-23 15-21 51-66.5t54-70.5q-27-50-41-99l-183-27q-13-2-21-12.5t-8-23.5v-222q0-12 8-23t19-13l186-28q14-46 39-92-40-57-107-138-10-12-10-24 0-10 9-23 26-36 98.5-107.5t94.5-71.5q13 0 26 10l138 107q44-23 91-38 16-136 29-186 7-28 36-28h222q14 0 24.5 8.5t11.5 21.5l28 184q49 16 90 37l142-107q9-9 24-9 13 0 25 10 129 119 165 170 7 8 7 22 0 12-8 23-15 21-51 66.5t-54 70.5q26 50 41 98l183 28q13 2 21 12.5t8 23.5z"></path>
                           </svg>
                        </Link>
                     </span>
                  </div>

                  <div id="ListMainContent">
                     <ListItems itemStatuses={this.state.itemStatuses} select={this.onSelectItem} listSize={this.state.preferences.listSize} data={this.state.items} />
                  </div>
                  <button onClick={this.markAsSeen} id="markAsSeen">Mark all items as &quot;seen&quot;</button>
                  <div id="ListFooter">
                     visual design based on <a href="http://blog.trackduck.com/weekly/top-10-hacker-news-redesigns/unknown-author-2/">this redesign by unknown author</a>.
               </div>
               </div>
            </div>

            <div id="ItemPanel">
               <Switch>
                  <Route exact path="/" render={()=><EmptyPanel/>} />
                  <Route exact path="/preferences" render={(routeProps) => 
                     <Preferences
                        setColor={boundSetColor} dialogClickHandler={boundDialogClickHandler} setListSize={boundSetListSize} color={this.state.preferences.color} listSize={this.state.preferences.listSize}
                        {...routeProps}
                     />}>
                  </Route>
                  <Route path="/item/:id" render={(routeProps) =>
                     <IFrameArea 
                        {...routeProps} 
                        items={this.state.items}
                     />
                  }/>
               </Switch>
            </div>
         </div>
      )
   };
}
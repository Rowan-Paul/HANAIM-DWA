import React from 'react'

import frontPageItems from '../frontpageData';
import IFrameArea from './IFrameArea';
import ListItems from './ItemsList';

export class RrHNApp extends React.Component {
   constructor(props) {
      super(props);

      this.state = {
         items: frontPageItems,
         selectedItem: ''
      }
   }

   onSelectItem = (url) => {
      console.log(url);
      this.setState(() => ({
         selectedItem: url
      }));
   }

   render() {
      return (
      <div className="App">
         <div id="ListPanel">
            <div className="ItemList">
               <div className="Logo">
                  <div className="colored">
                     RRHN
                  </div>

                  <div className="title">
                     Hacker News
                  </div>
               </div>

               <div id="ListMainContent">
                  <ListItems select={this.onSelectItem} data={this.state.items} />
               </div>
               <div id="ListFooter">
                  visual design based on <a href="http://blog.trackduck.com/weekly/top-10-hacker-news-redesigns/unknown-author-2/">this redesign by unknown author</a>.
               </div>
            </div>
         </div>

         <div id="ItemPanel">
            {this.state.selectedItem.length > 1
               ? <IFrameArea url={this.state.selectedItem} title={this.state.selectedItem.title}></IFrameArea>
               : <h2>No item selected</h2>
            }
         </div>
      </div>
   )};
}
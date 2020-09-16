import React from 'react'

import frontPageItems from '../frontpageData';

import ListItems from './ListItems';
import IFrameArea from './IFrameArea';

export class RrHNApp extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         items: frontPageItems,
         selectedItem: frontPageItems[1],
      }
   }
   render() {
      return <div id="react-root">
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
                  <ListItems data={this.state.items} />
               </div>
               <div id="ListFooter">
                  visual design based on <a href="http://blog.trackduck.com/weekly/top-10-hacker-news-redesigns/unknown-author-2/">this redesign by unknown author</a>.
               </div>
            </div>
         </div>

         <div id="ItemPanel">
            {/* <h2>No item selected yet.</h2>

            <p>Select an item in the colum on the left.</p> */}
            
            <IFrameArea title={this.state.title} url={this.state.selectedItem.url}/>
         </div>
      </div>
   </div>
   }
}

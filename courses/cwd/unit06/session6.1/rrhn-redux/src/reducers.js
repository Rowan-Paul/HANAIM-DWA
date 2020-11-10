import * as Redux from 'redux';

// dummy data, needed because this version does not do AJAX yet.
import initialFrontPageData from './frontPageData';
import initialItemStatuses from './itemStatuses';

//=====================================================================
//    State management for HN Items and their read/seen-statuses
//---------------------------------------------------------------------

// Action Creators:

export function markAsSeenAction(listSize){
  return { type: "markAsSeenAction", listSize };
}
export function toggleItemAction(item){
  return { type: "toggleItemAction", item };
}

// Reducer:

const initialHNItemsState = {
  items: initialFrontPageData,
  selectedItem: null,
  statuses: initialItemStatuses,
}

function hnItemsReducer( state = initialHNItemsState, action ) {
  // Note how all branches of the switch-statement always return
  // (a new version of) the state. Reducers must always return a (new) state.
  switch(action.type) {

  case 'toggleItemAction':
    if(state.selectedItem){
      if( action.item.id === state.selectedItem.id) {
        return { ...state, selectedItem: null };
      }
    }
    let newStatuses = { ...state.statuses, [action.item.id]: "read" };
    return { ...state, selectedItem: action.item, statuses: newStatuses };
    // break; not needed: this branch always returns from function

  case 'markAsSeenAction':
    newStatuses = { ...state.statuses };
    state.items.forEach((itm, idx) => {
      if(idx < action.listSize && state.statuses[itm.id] === undefined) {
        newStatuses[itm.id] = "seen";
      }
    })
    return { ...state, statuses:newStatuses };
    // break; not needed: this branch always returns from function

  default:
    return state;
  }
}

//=====================================================================
//    State management for the Preferences
//---------------------------------------------------------------------

// Action Creators:

export function showPrefsAction() {
  return { type: "showPrefsAction" };
}

export function closePrefsAction() {
  return { type: "closePrefsAction"};
}

export function closeAndApplyPrefsAction() {
  return { type: "closeAndApplyPrefsAction" }
}

export function editListSizeAction(listSize) {
  return { type: "editListSizeAction", listSize }
}

export function editColorAction(color) {
  return { type: "editColorAction", color }
}

// Reducer:

const initialPreferencesState = {
  showingPrefs:    false,
  editingColor:    null,
  editingListSize: null,
  currentColor:    "orange",
  currentListSize: 42
}

function preferencesReducer(state = initialPreferencesState, action) {
  // Note how all branches of the switch-statement always return
  // (a new version of) the state. Reducers must always return a (new) state.
  switch(action.type) {

  case 'showPrefsAction': 
    let changes = { showingPrefs:    true,
                    editingColor:    state.currentColor,
                    editingListSize: state.currentListSize
                  }
    return { ...state, ...changes };
    // break; not needed: this branch always returns from function
    
  case 'closePrefsAction':
    return { ...state, showingPrefs: false };

  case 'closeAndApplyPrefsAction':
    let applyChanges = {  showingPrefs: false,
                          currentColor: state.editingColor,
                          currentListSize: state.editingListSize,
                  }
    return { ...state, ...applyChanges };
  
  case 'editListSizeAction':
    return { ...state, editingListSize: action.listSize }

  case 'editColorAction':
    return { ...state, editingColor: action.color }

  default:
    return state;
  }
}

//===========================================================================
//  Combining the reducers and their state into a single reducer managing
//  a single state
//---------------------------------------------------------------------------

export const mainReducer = Redux.combineReducers({
  hnItems:  hnItemsReducer,
  prefs:    preferencesReducer
})

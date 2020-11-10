import React from 'react'
import './SearchHistory.css'

export default function SearchHistory (props) {
  return <div className="SearchHistory">
    <p>Search History</p>
    {props.history.map(item => <button onClick={(e) => props.onClick(item)}>{item}</button>)}
  </div>
}
import React, { useState } from "react";

export default function Preferences(props) {
  const [listSize, setListSize] = useState(props.listSize);
  const [color, setColor] = useState(props.color);

  const onSubmit = (event) => {
    event.preventDefault();
    props.setColor(color)
    props.setListSize(listSize)
    props.history.goBack()
  }

  let inputStyle;
  if (listSize > 500 || listSize < 0) {
    inputStyle = { border: "4px solid red" };
  }

  return (
    <div id="ContentPanel" className="preferences">
      <div className="PreferencesDialog">
        <header>
          <div className="Logo">
            <div className="colored">RrHN</div>
            <div className="title">Settings</div>
          </div>
        </header>

        <label
          htmlFor="listSizeField"
          onChange={(e) => setListSize(e.target.value)}
          value={listSize}
        >
          Show{" "}
          <input
            type="number"
            id="listSizeField"
            defaultValue={listSize}
            style={inputStyle}
          />{" "}
          items in the list.
        </label>
        <label htmlFor="colorField">
          color:
          <select
            id="colorField"
            onChange={(e) => setColor(e.target.value)}
            value={color}
          >
            <option>orange</option>
            <option>green</option>
            <option>brown</option>
          </select>
        </label>
        <div className="dialogButtons">
          <button onClick={(e) => onSubmit(e)}>OK</button>
          <button onClick={() => props.history.goBack()}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

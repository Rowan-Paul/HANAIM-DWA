import React from 'react'

export default class Preferences extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listSize: this.props.listSize,
      color: this.props.color
    }
  }

  colorChangeHandler (event) {
    this.setState({color: event.target.value})
  }

  listSizeHandler (event) {
    this.setState({listSize: event.target.value})
  }

  onSubmit (event) {
    event.preventDefault();
    this.props.setColor(this.state.color)
    this.props.setListSize(this.state.listSize)
    this.props.dialogClickHandler()
  }

  render() {
    let inputStyle
    if (this.state.listSize > 500 || this.state.listSize < 0) {
        inputStyle = { border: '4px solid red' }
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

          <label htmlFor="listSizeField" onChange={(e) => this.listSizeHandler(e)} value={this.state.listSize}>
            Show <input type="number" id="listSizeField" defaultValue={this.state.listSize} style={inputStyle} /> items in the list.
          </label>
          <label htmlFor="colorField">
            color:
            <select id="colorField" onChange={(e) => this.colorChangeHandler(e)} value={this.state.color}>
              <option>orange</option>
              <option>green</option>
              <option>brown</option>
            </select>
          </label>
          <div className="dialogButtons">
            <button onClick={(e) => this.onSubmit(e)}>OK</button>
            <button onClick={this.props.dialogClickHandler}>Cancel</button>
          </div>
          
        </div>
      </div>
    )
  }
};
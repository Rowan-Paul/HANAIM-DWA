import React from "react";
import { NavLink } from "react-router-dom";

export class NavBar extends React.Component {
  render() {
    return (
      <nav>
        <NavLink exact to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/delays">Delays</NavLink>
        <NavLink to="/adddelay">Add delay</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/logout">Logout</NavLink>
      </nav>
    );
  }
}
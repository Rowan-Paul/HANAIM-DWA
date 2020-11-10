import React from "react";
import { BrowserRouter as Router, Route, Switch, NavLink } from "react-router-dom";

const AboutTeam = () => <p>This is the team for you</p>;
const AboutContact = () => <p>You can contact us</p>;

export const About = () => (
	<div className="page columns">
		<div className="sidebar">
			<NavLink to="/about/team">Team</NavLink>
			<NavLink to="/about/contact">Contact</NavLink>
		</div>
		<div className="content">
      <Switch>
        <Route path="/about/team" component={AboutTeam} />
        <Route path="/about/contact" component={AboutContact} />
        <Route component={AboutDefault} />
      </Switch>
    </div>
	</div>
);

const AboutDefault = () => <p>Here you can read more about us</p>;

export const AboutPath = "/about";
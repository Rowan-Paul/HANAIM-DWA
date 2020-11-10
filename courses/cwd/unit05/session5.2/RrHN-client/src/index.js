import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter as Router } from 'react-router-dom';

import "./main.css"; // Using Webpack, we usually import CSS from JavaScript, not from HTML.
// This is not standard JavaScript, it's a Webpack feature
// that is popular in the React community.

import { RrHNApp } from "./components/App";

const theAppWithRouting = (
	<Router>
		<RrHNApp />
	</Router>
);

ReactDOM.render(theAppWithRouting, document.getElementById('root'));
import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";
import Preferences from "./components/Preferences";
import EmptyPanel from "./components/EmptyPanel";

import "./main.css"; // Using Webpack, we usually import CSS from JavaScript, not from HTML.
// This is not standard JavaScript, it's a Webpack feature
// that is popular in the React community.

import { RrHNApp } from "./components/App";

const theAppWithRouting = (
	<BrowserRouter>
		<RrHNApp />
	</BrowserRouter>
);

ReactDOM.render(theAppWithRouting, document.getElementById('root'));
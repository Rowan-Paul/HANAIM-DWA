import React from "react";

import DataAPI from "../api/DataAPI";

import {
	BrowserRouter as Router,
	Route,
	Switch,
	NavLink,
} from "react-router-dom";

export const Delays = () => (
	<div className="page columns">
		<div className="sidebar">
			<DelaysList />
		</div>

		<div className="content">
			{/* <p>Click on a date for more details</p> */}
			<Route path="/delays/date/:dateId" component={DelaysOnDate} />
		</div>
	</div>
);

const DelaysOnDate = (props) => {
	const dateId = props.match.params.dateId;
	const delays = DataAPI.getDelaysOnDate(dateId);

	return (
		<div className="content">
			{delays.length > 0 ? (
				delays.map(({ id, from, to, minutesHuman }) => (
					<p key={id}>
						from {from} to {to} - {minutesHuman} delay
					</p>
				))
			) : (
				<p>No delays for this date.</p>
			)}
		</div>
	);
};

const DelaysList = () => {
	const delayDates = DataAPI.getDistinctDates();

	return delayDates.map(({ date, dateHuman }) => (
		<NavLink key={date} to={`/delays/date/${date}`}>
			{dateHuman}
		</NavLink>
	));
};

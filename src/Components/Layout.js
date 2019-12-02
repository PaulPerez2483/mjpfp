import React, { Component } from "react";
import { Calendar, jsDates } from "./Calendar.js";
import moment from "moment";

// let weekdaysShort = moment.weekdaysShort();
// let allMonths = moment.monthsShort();
// let currentMonth = moment().month();
// console.log(allMonths);
console.log(Calendar);
console.log("line 9", moment.months());

const LeftInfo = () => {
	const { now } = jsDates;

	return <div className='info-holder'></div>;
};

class Layout extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dateObject: moment,
			allMonths: moment.months()
		};
	}
	render() {
		console.log("line 31", this.props);
		console.log(this.state.dateObject);
		return (
			<div className='container'>
				<div className='image-holder'>
					<LeftInfo />
				</div>
				<div className='calendar-holder'>
					<Calendar {...this.state.dateObject} />
				</div>
			</div>
		);
	}
}

export default Layout;

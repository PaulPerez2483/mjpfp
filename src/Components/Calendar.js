import React, { Component } from "react";
import moment from "moment";
import axios from "axios";
import { Link, Route } from "react-router-dom";
// console.log(Link);
let num = moment().month();
const jsDates = {
	now: new Date()
};

class Calendar extends Component {
	constructor() {
		super();
		this.state = {
			month: num,
			event: [],
			idElem: "December",
			liEl: new Date().getDay()
		};
	}
	handleClick(e) {
		num = e.target.id;
		this.setState({ month: num });
	}

	dayHandleClick(e) {
		let idElement = e.target.id;
		let xtest = e.target.id;
		// console.log(e.target);
		// console.log(e.target.classList);
		if (e.target.classList.contains("currentDay")) {
			e.target.classList.remove("currentDay");
		} else {
			e.target.classList.add("currentDay");
			this.setState({ idElem: idElement, liEl: xtest });
		}
	}
	async componentDidMount() {
		const funEvents = await Promise.all([axios.get("/api/events")]);
		this.setState({ event: funEvents[0].data });
	}
	render() {
		// console.log("line 19", this.state.month);
		if (this.state.event.length === 0) {
			return null;
		} else {
			// console.log("line 38", this.state.event);
			// console.log("line54", this.state.idElem);

			const days = [];
			const count = moment()
				.month(this.state.month)
				.daysInMonth();

			for (let i = 1; i < count; i++) {
				days.push(
					moment()
						.month(num)
						.date(i)
						.format("ddd : DD - MMMM")
				);
			}
			// console.log(days);
			const { ...data } = this.props;
			// i cant find the current year and current month in moment js object.
			const { now } = jsDates;
			const currentDay = now.getDate();

			const currentYear = now.getFullYear();
			const allMonths = data.monthsShort();
			const allWeekDays = data.weekdaysShort();
			return (
				<div>
					<div className='float-left'>
						{/* <span className='likeH1'>
							{this.state.idElem.slice(
								this.state.idElem.indexOf("-") + 1,
								this.state.idElem.length
							)}
						</span> */}
						<span className='largeDay'>{this.state.liEl}</span>
					</div>
					<h1>{currentYear}</h1>
					<ul className='months'>
						{allMonths.map((month, idx) => (
							<li
								id={idx}
								className={Number(num) === idx ? "selected" : ""}
								key={month}
								onClick={this.handleClick.bind(this)}>
								{month.toUpperCase()}
							</li>
						))}
					</ul>
					<ul className='cl-day'>
						{days.map((day, idx) => (
							<li
								onClick={this.dayHandleClick.bind(this)}
								className={
									idx + 1 === currentDay && num === 11 ? "currentDay" : ""
								}
								id={day}
								key={idx}>
								{day.slice(0, day.indexOf("-"))}
								<span>
									{this.state.event.map((events) => {
										let currentDay = day.slice(0, day.indexOf("-"));
										let currentMonth = events.eventDate.slice(4, 7);
										let eventDay = events.eventDate.replace(currentMonth, ":");
										let currentEvent = eventDay.slice(0, 8);
										if (currentDay.includes(currentEvent)) {
											return (
												<span className={events.eventColor}>
													{events.eventName}
												</span>
											);
										}
									})}
								</span>
							</li>
						))}
					</ul>
				</div>
			);
		}
	}
}

export { Calendar, jsDates };

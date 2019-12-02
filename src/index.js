import React from "react";
import ReactDOM from "react-dom";
import Layout from "./Components/Layout.js";

const tools = {
	Component: React.Component,
	render: ReactDOM.render,
	root: document.getElementById("root")
};

const { Component, render, root } = tools;

class App extends Component {
	render() {
		return <Layout />;
	}
}

render(<App />, root);

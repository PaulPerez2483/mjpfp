const path = require("path");
const express = require("express");
const db = require("./db/db");
const app = express();
const { Event } = db.models;

app.use(express.static(path.join(__dirname, "..", "public")));
app.use(express.static(path.join(__dirname, "..", "dist")));

app.get("/", (req, res, next) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.get("/api/events", (req, res, next) => {
	Event.findAll()
		.then((events) => res.send(events))
		.catch(next);
});

module.exports = { app };

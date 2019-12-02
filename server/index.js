const { app } = require("./app");
const { db } = require("./db/db.js");
const PORT = process.env.PORT || 4000;

db.sync()
	.then(() => {
		app.listen(PORT, () => {
			console.log("listening on port:", PORT);
			console.log("click me --->", `http://localhost:${PORT}`);
		});
	})
	.catch((e) => {
		console.log("connection error", e);
	});

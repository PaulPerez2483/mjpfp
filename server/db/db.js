const Sequelize = require("sequelize");
const { STRING, UUID, UUIDV4 } = Sequelize;

const PG_URI = process.env.DATABASE_URL || "postgres://localhost:5432/events";
const db = new Sequelize(PG_URI);

const uuidDef = {
	type: UUID,
	primaryKey: true,
	defaultValue: UUIDV4
};

const Event = db.define("event", {
	id: uuidDef,
	eventName: {
		type: STRING,
		allowNull: false
	},
	eventDate: {
		type: STRING,
		allowNull: false
	},
	eventColor: {
		type: STRING,
		allowNull: false
	}
});

const syncAndSeed = async () => {
	await db.sync({ force: true });
	const events = [
		{
			eventName: "Homework",
			eventDate: new Date(2019, 11, 2).toDateString(),
			eventColor: "red"
		},
		{
			eventName: "Christmas",
			eventDate: new Date(2019, 11, 24).toDateString(),
			eventColor: "blue"
		},
		{
			eventName: "Soccer Game",
			eventDate: new Date(2019, 11, 7).toDateString(),
			eventColor: "yellow"
		},
		{
			eventName: "Senior Test",
			eventDate: new Date(2019, 11, 11).toDateString(),
			eventColor: "green"
		}
	];
	const [homeWork, christmas, soccerGame] = await Promise.all(
		events.map((event) => Event.create(event))
	);

	// console.log(homeWork);
};

syncAndSeed().catch((err) => console.log(err));

module.exports = {
	db,
	models: {
		Event
	}
};

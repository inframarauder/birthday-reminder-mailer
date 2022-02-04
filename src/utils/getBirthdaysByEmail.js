const mongodb = require("mongodb");

// This methods runs an aggregation on the DB and returns the
// list of birthdays every user needs to be reminded of along with their emails

module.exports = () => {
	let db;
	const client = new mongodb.MongoClient(process.env.DB_URI);

	client
		.connect()
		.then(() => {
			db = client.db(process.env.DB_NAME);
			console.log("Connected to DB");
		})
		.catch((error) => {
			console.error("Error connecting to DB", error);
		});

	return new Promise((resolve, reject) => {
		const date = new Date();
		const day = date.getDate();
		const month = date.getMonth() + 1;

		db.collection("birthdays")
			.aggregate([
				{ $match: { month, day } },
				{ $group: { _id: "$email", birthdays: { $addToSet: "$friend" } } },
			])
			.toArray()
			.then((data) => {
				console.log("Mail Payload:", data);
				resolve(data);
			})
			.catch((err) => reject(err));
	});
};

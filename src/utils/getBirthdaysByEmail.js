const mongodb = require("mongodb");

const client = mongodb.MongoClient(process.env.DB_URI);
const db = client.db(process.env.DB_NAME);

// This methods runs an aggregation on the DB and returns the
// list of birthdays every user needs to be reminded of along with their emails

module.exports = () =>
	new Promise((resolve, reject) => {
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

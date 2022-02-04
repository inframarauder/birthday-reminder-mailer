const mongodb = require("mongodb");

// This methods runs an aggregation on the DB and returns the
// list of birthdays every user needs to be reminded of along with their emails

module.exports = () => {
	return new Promise((resolve, reject) => {
		const client = new mongodb.MongoClient(process.env.DB_URI);

		client
			.connect()
			.then(() => {
				console.log("Connected to DB");
				const db = client.db(process.env.DB_NAME);

				const date = new Date();
				const day = date.getDate();
				const month = date.getMonth() + 1;

				db.collection("birthdays")
					.aggregate([
						{ $match: { month, day } },
						{ $group: { _id: "$email", birthdays: { $addToSet: "$friend" } } },
						{ $project: { _id: 0, email: "$_id", birthdays: 1 } },
					])
					.toArray()
					.then((data) => {
						console.log("Mail Payload:", data);
						resolve(data);
					})
					.catch((err) => reject(err));
			})
			.catch((error) => {
				reject(error);
			});
	});
};

const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,

	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD,
	},

	tls: {
		rejectUnauthorized: false,
	},
});

//This methods takes email and list of birthdays and sends reminder email containing the list

module.exports = (email, birthdays) =>
	new Promise((resolve, reject) => {
		let html = `<p>Hi</p><p>Here is a list of all your friends who have their birthdays today:</p><ol>`;
		birthdays.forEach((friend) => (html += `<li>${friend}</li>`));
		html += `</ol>`;

		const mailOptions = {
			from: process.env.EMAIL,
			to: email,
			subject: "Birthday Reminder!",
			html,
		};

		transport
			.sendMail(mailOptions)
			.then(() => resolve())
			.catch((error) => reject(error));
	});

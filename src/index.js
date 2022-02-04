"use strict";
const getBirthdaysByEmail = require("./utils/getBirthdaysByEmail");
const sendEmail = require("./utils/sendEmail");

module.exports.sendReminderEmail = async () => {
	try {
		const birthdayReminders = await getBirthdaysByEmail();
		birthdayReminders.forEach((reminder) => {
			const { email, birthdays } = reminder;
			sendEmail(email, birthdays);
		});

		return "Email(s) Sent!";
	} catch (error) {
		console.error(error);
		return "sendReminderEmail failed!";
	}
};

"use strict";
const getBirthdaysByEmail = require("./utils/getBirthdaysByEmail");
const sendReminderEmail = require("./utils/sendReminderEmail");

module.exports.sendReminderEmail = async () => {
	try {
		const birthdayReminders = await getBirthdaysByEmail();
		birthdayReminders.forEach((reminder) => {
			const { email, birthdays } = reminder;
			sendReminderEmail(email, birthdays);
		});

		return "Email(s) Sent!";
	} catch (error) {
		console.error(error);
		return "sendReminderEmail failed!";
	}
};

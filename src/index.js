"use strict";
const getBirthdaysByEmail = require("./utils/getBirthdaysByEmail");
const sendEmail = require("./utils/sendEmail");

module.exports.sendReminderEmail = async () => {
	try {
		const birthdayReminders = await getBirthdaysByEmail();
		if (birthdayReminders.length > 0) {
			for (const birthdayReminder of birthdayReminders) {
				const { email, birthdays } = birthdayReminder;
				await sendEmail(email, birthdays);
			}

			return "Email(s) Sent!";
		} else {
			return "No Birthdays to send!";
		}
	} catch (error) {
		console.error(error);
		return "sendReminderEmail failed!";
	}
};

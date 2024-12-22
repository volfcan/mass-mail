const fs = require('fs')
const csv = require('csv-parser');
const nodemailer = require('nodemailer');

// Configure your SMTP transporter
const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'your-email@gmail.com',
		pass: 'your-email-password'
	}
})

// Function to send emails
const sendEmail = (to, subject, message) => {
	const mailOptions = {
		from: 'volcanbozkurt@gmail.com',
		to,
		subject,
		text: message
	};

	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			console.error(`Failed to send email to ${to}:`, error);
		} else {
			console.log(`Email sent to ${to}: ${info.response}`);
		}
	})
};

// Read CSV file and send emails
const csvFilePath = 'email_list.csv';  

fs.createReadStream(csvFilePath)
	.pipe(csv())
	.on('data', (row) => {
		const email = row['Email']; // Replace with the exact column header in the CSV file
		if(email) {
			sendEmail(email, 'Subject Line', 'Your message goes here');
		}
	})
	.on('end', () => {
		console.log('All emails have been processsed.');
	});

const nodeCron = require('node-cron');
const CrewMember = require('../models/CrewMember');
const { sendEmail } = require('../utils/emailService');
const moment = require('moment');

nodeCron.schedule('0 0 * * *', async () => { // Runs every day at midnight
  console.log("Running scheduled task for document expiry reminders.");
  const today = moment().startOf('day');
  const inAWeek = moment(today).add(7, 'days');

  try {
    const expiringDocuments = await CrewMember.find({
      documentExpiryDate: {
        $gte: today.toDate(),
        $lte: inAWeek.toDate()
      }
    });

    if (expiringDocuments.length > 0) {
      console.log(`Found ${expiringDocuments.length} crew members with documents expiring within a week.`);
      expiringDocuments.forEach(member => {
        sendEmail(
          process.env.ADMIN_EMAIL, // Assuming you have an admin email in your .env for notifications
          `Document Expiry Reminder for ${member.name}`,
          `The document for ${member.name} (${member.role}) will expire on ${member.documentExpiryDate}. Please take the necessary actions.`
        ).then(() => {
          console.log(`Email sent for document expiry reminder for ${member.name}.`);
        }).catch(error => {
          console.error("Failed to send document expiry reminder email:", error.message, error.stack);
        });
      });
    } else {
      console.log("No documents expiring within a week.");
    }
  } catch (error) {
    console.error("Error running document expiry reminder scheduled task:", error.message, error.stack);
  }
}, {
  scheduled: true,
  timezone: 'America/New_York'
});
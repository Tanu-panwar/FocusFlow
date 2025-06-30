
const cron = require("node-cron");
const transporter = require("./mailer");
const User = require("./models/user")

// Schedule: every day at 8 PM (20:00)
cron.schedule("0 20 * * *", async () => {
  try {
    const users = await User.find();
    for (let user of users) {
      if (user.email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: "⏰ Daily Study Reminder from Focus Flow",
          html: `
            <div style="background-color:#1f1f1f; padding: 30px; font-family: Arial, sans-serif; color: #fff; text-align: center;">
              <h2 style="color: #f23064;">📚 Focus Flow Daily Reminder</h2>
              <p style="font-size: 16px;">Hey <strong>${user.username}</strong>,</p>
              <p style="font-size: 15px; color: #ddd;">
                Just a quick reminder to review your flashcards today and keep your learning on track! 🚀
              </p>
              <a href="http://localhost:5173/login" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #f23064; color: white; text-decoration: none; border-radius: 5px;">
                Go to Focus Flow
              </a>
              <p style="margin-top: 30px; font-size: 12px; color: #999;">
                You received this reminder because you're registered with Focus Flow.
              </p>
            </div>
          `,
        });
        console.log(`Reminder sent to ${user.email}`);
      }
    }
  } catch (error) {
    console.error("Error sending reminder emails:", error);
  }
});

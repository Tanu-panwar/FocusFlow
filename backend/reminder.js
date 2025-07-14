
const mongoose = require("mongoose");
const transporter = require("./mailer");
const User = require("./models/user");
require("dotenv").config();

const sendReminderEmails = async (timeLabel) => {
  try {
    const users = await User.find();
    for (let user of users) {
      if (user.email) {
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: user.email,
          subject: `⏰ ${timeLabel} Study Reminder from Focus Flow`,
          html: `
            <div style="background-color:#1f1f1f; padding: 30px; font-family: Arial, sans-serif; color: #fff; text-align: center;">
              <h2 style="color: #f23064;">🎯 Focus Flow ${timeLabel} Study Reminder</h2>
              <p style="font-size: 16px;">Hey <strong>${user.username}</strong>,</p>
              <p style="font-size: 15px; color: #ddd; margin: 15px 0;">
                This is your gentle nudge to stay consistent with your study goals today. Whether it's completing a task, revising notes, or practicing something new — make your time count! 💪
              </p>
              <p style="font-size: 15px; color: #ccc;">
                Remember, small efforts daily lead to big results. You're doing great — keep going! 🚀
              </p>
              <a href="https://focusflowfrontend.onrender.com" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #f23064; color: white; text-decoration: none; border-radius: 5px;">
                Open Focus Flow
              </a>
              <p style="margin-top: 30px; font-size: 12px; color: #999;">
                You received this reminder because you're part of the Focus Flow community.
              </p>
            </div>
          `,
        });
        console.log(`${timeLabel} reminder sent to ${user.email}`);
      }
    }


    // await mongoose.connection.close();
    // console.log("MongoDB connection closed after sending emails");
    // process.exit(0);
  } catch (error) {
    console.error("Error sending reminder emails:", error);
    process.exit(1);
  }
};

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected in reminder.js");
    const timeLabel = process.argv[2] || "Daily";
    await sendReminderEmails(timeLabel);
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
})();



// const mongoose = require("mongoose");
// const transporter = require("./mailer");
// const User = require("./models/user");
// require("dotenv").config();

// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log("MongoDB connected in reminder.js");
//     const timeLabel = process.argv[2] || "Daily";
//     sendReminderEmails(timeLabel);
//   })
//   .catch((err) => {
//     console.error("MongoDB connection error:", err);
//     process.exit(1);
//   });

// const sendReminderEmails = async (timeLabel) => {
//   try {
//     const users = await User.find();
//     for (let user of users) {
//       if (user.email) {
//         await transporter.sendMail({
//           from: process.env.EMAIL_USER,
//           to: user.email,
//           subject: `⏰ ${timeLabel} Study Reminder from Focus Flow`,
//           html: `
//               <div style="background-color:#1f1f1f; padding: 30px; font-family: Arial, sans-serif; color: #fff; text-align: center;">
//               <h2 style="color: #f23064;">🎯 Focus Flow ${timeLabel} Study Reminder</h2>
//               <p style="font-size: 16px;">Hey <strong>${user.username}</strong>,</p>
//               <p style="font-size: 15px; color: #ddd; margin: 15px 0;">
//                 This is your gentle nudge to stay consistent with your study goals today. Whether it's completing a task, revising notes, or practicing something new — make your time count! 💪
//               </p>
//               <p style="font-size: 15px; color: #ccc;">
//                 Remember, small efforts daily lead to big results. You're doing great — keep going! 🚀
//               </p>
//               <a href="https://focusflowfrontend.onrender.com" style="display: inline-block; margin-top: 20px; padding: 12px 24px; background-color: #f23064; color: white; text-decoration: none; border-radius: 5px;">
//                 Open Focus Flow
//               </a>
//               <p style="margin-top: 30px; font-size: 12px; color: #999;">
//                 You received this reminder because you're part of the Focus Flow community.
//               </p>
//             </div>
//           `,
//         });
//         console.log(`${timeLabel} reminder sent to ${user.email}`);
//       }
//     }

//     mongoose.connection.close(() => {
//       console.log("MongoDB connection closed after sending emails");
//       process.exit(0);
//     });
//   } catch (error) {
//     console.error("Error sending reminder emails:", error);
//     process.exit(1);
//   }
// };



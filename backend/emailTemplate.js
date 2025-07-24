
export const Verification_Email_Template = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
      <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #1f1f1f;
            color: #ffffff;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background-color: #2b2b2b;
            border-radius: 12px;
            box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
            overflow: hidden;
            border: 1px solid #333;
        }

        .header {
            background-color: #f23064;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 24px;
            font-weight: bold;
        }

        .content {
            padding: 25px 30px;
            color: #ddd;
            line-height: 1.7;
        }

        .verification-code {
            display: block;
            margin: 25px auto;
            font-size: 22px;
            color: #f23064;
            background: #3a3a3a;
            border: 2px dashed #f23064;
            padding: 12px 20px;
            text-align: center;
            border-radius: 6px;
            font-weight: bold;
            letter-spacing: 3px;
            width: fit-content;
        }

        .button {
            display: block;
            width: fit-content;
            margin: 25px auto;
            padding: 14px 28px;
            background-color: #f23064;
            color: white;
            text-decoration: none;
            font-weight: bold;
            font-size: 16px;
            border-radius: 6px;
            transition: background-color 0.3s ease;
        }

        .button:hover {
            background-color: #ff4f7f;
        }

        .footer {
            background-color: #1f1f1f;
            padding: 15px 20px;
            text-align: center;
            color: #888;
            font-size: 13px;
            border-top: 1px solid #333;
        }

        .contact {
            color: #f23064;
            text-decoration: none;
        }
    </style>
  </head>
  <body>
    <div class="container">
        <div class="header">Verify Your Email</div>
        <div class="content">
            <p>Hi,</p>
            <p>Thanks for joining <strong>Focus Flow</strong>! Please verify your email using the code below:</p>
            <span class="verification-code">{verificationCode}</span>
            <a href="https://focusflowfrontend.onrender.com/auth?mode=signup" class="button">Verify Email</a>
            <p>This code expires in 10 minutes.</p>
            <p>If you didn’t register, you can safely ignore this email. Questions? Reach out at 
                <a href="mailto:support@focusflow.com" class="contact">support@focusflow.com</a>
            </p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Focus Flow. All rights reserved.
        </div>
    </div>
  </body>
  </html>
`;


export const Welcome_Email_Template = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Welcome to Focus Flow</title>
    <style>
        body {
            font-family: 'Segoe UI', sans-serif;
            background-color: #1f1f1f;
            color: #fff;
            margin: 0;
            padding: 0;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            background: #2b2b2b;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.3);
            overflow: hidden;
            border: 1px solid #333;
        }

        .header {
            background-color: #f23064;
            color: white;
            text-align: center;
            padding: 20px;
            font-size: 26px;
            font-weight: bold;
        }

        .content {
            padding: 25px;
            line-height: 1.8;
            color: #ddd;
        }

        .welcome-message {
            font-size: 18px;
            margin: 20px 0;
        }

        .button {
            display: inline-block;
            padding: 12px 25px;
            margin: 20px 0;
            background-color: #f23064;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
            font-weight: bold;
            transition: background-color 0.3s ease;
        }

        .button:hover {
            background-color: #ff4f7f;
        }

        .footer {
            background-color: #1f1f1f;
            padding: 15px;
            text-align: center;
            color: #888;
            font-size: 12px;
            border-top: 1px solid #333;
        }

        .contact {
            color: #f23064;
            text-decoration: none;
        }

        ul {
            padding-left: 20px;
        }

        li {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">Welcome to Focus Flow!</div>
        <div class="content">
            <p class="welcome-message">Hello {name},</p>
            <p>We’re excited to welcome you to <strong>Focus Flow</strong>, your personal space for focused productivity and self-growth!</p>
            <p>Here’s how you can get started:</p>
            <ul>
                <li>Track tasks with the Pomodoro timer.</li>
                <li>Build daily habits that stick.</li>
                <li>Use flashcards to boost memory.</li>
                <li>Monitor your progress daily and weekly.</li>
            </ul>
            <a href="https://focusflowfrontend.onrender.com/login" class="button">Launch Focus Flow</a>
            <p>If you ever need help, contact us at 
                <a href="mailto:support@focusflow.com" class="contact">support@focusflow.com</a>. We're here for you!
            </p>
        </div>
        <div class="footer">
            &copy; ${new Date().getFullYear()} Focus Flow. Stay consistent. Stay sharp.
        </div>
    </div>
</body>
</html>
`;

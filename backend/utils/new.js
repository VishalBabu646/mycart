require('dotenv').config();
const nodemailer = require('nodemailer');

async function testMail() {
  let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    let info = await transporter.sendMail({
      from: `"Test" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_USER,
      subject: "Test mail",
      text: "Testing Mailtrap credentials",
    });
    console.log("Mail sent:", info.messageId);
  } catch (error) {
    console.error("Mail error:", error);
  }
}

testMail();

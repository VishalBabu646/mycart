const nodemailer = require('nodemailer')
const sendEmail = async(options) => {
    const transport = {
        host : process.env.SMTP_HOST,
        port : process.env.SMTP_PORT,
        auth : {
            user : process.env.SMTP_USER,
            pass : process.env.SMTP_PASS
        }
    };

    console.log(transport);
    const transporter = nodemailer.createTransport(transport);

    const message = {
        from : `${process.env.SMTP_NAME} <${process.env.SMTP_FROM_EMAIL}>`,
        to: options.email,
        subject:options.subject,
        text: options.message
    }
    console.log(options);

    await transporter.sendMail(message);
}

module.exports = sendEmail;


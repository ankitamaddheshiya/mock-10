require('dotenv').config();
const nodemailer = require("nodemailer");

async function sendEmail(data) {

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'fsociety430@gmail.com',
            pass: process.env.GoogleKey
        }
    });

    transporter.sendMail({
        to: `${data.email}`,
        from: 'ankitamaddheshiyacs@gmail.com',
        subject: data.subject,
        html: data.body,
    })
        .then(() => console.log('mail sent successfully'))
        .catch((err) => console.log("err", err))

}

module.exports = { sendEmail }
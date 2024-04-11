const nodemailer = require('nodemailer');
const Otp = require('../models/otp.model');

let transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 25,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
    }
});

module.exports = {
    async sendOtp(data) {
        return new Promise(async (resolve, reject) => {
            let otp = Math.floor(100000 + Math.random() * 900000);
            await new Otp({ email: data.to, otp: otp }).save();
            let mailOptions = {
                from: process.env.SMTP_USER,
                to: data.email,
                subject: 'One Time Password',
                text: 'Your one time password is: ' + otp
            };
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                }
                resolve();
            });
        });
    }
}

const nodemailer = require('nodemailer')
const config = require('../config/mailer')

const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: config.GMAIL_USER,
        clientId: config.GMAIL_CLID,
        clientSecret: config.GMAIL_CLSE,
        refreshToken: config.GMAIL_RFTK,
        accessToken: config.GMAIL_ACTK,
        expires: 1484314697598
    }
});

module.exports = {
    sendEmail(from, to, subject, html) {
        return new Promise( function (resolve, reject){
            transport.sendMail({from, subject, to, html}, function(err, info){
                if (err) reject(err);
                
                resolve(info);
            });
        });
    }
};
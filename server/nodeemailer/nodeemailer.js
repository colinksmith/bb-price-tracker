// let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         type: 'OAuth2',
//         user: process.env.MAIL_USERNAME,
//         pass: process.env.MAIL_PASSWORD,
//         clientId: process.env.OAUTH_CLIENTID,
//         clientSecret: process.env.OAUTH_CLIENT_SECRET,
//         refreshToken: process.env.OAUTH_REFRESH_TOKEN
//     }
// });

// let mailOptions = {
//     from: tomerpacific@gmail.com,
//     to: tomerpacific @gmail.com,
//     subject: 'Nodemailer Project',
//     text: 'Hi from your nodemailer project'
//   };

// transporter.sendMail(mailOptions, function (err, data) {
//     if (err) {
//         console.log("Error " + err);
//     } else {
//         console.log("Email sent successfully");
//     }
// });


"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function mailOne(priceWatch) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.MAIL_USERNAME, // generated ethereal user
      pass: process.env.MAIL_PASSWORD, // generated ethereal password
    },
  });

  let message = `Hello, \n\n Your item ${priceWatch.item.title} has reached the price of $${priceWatch.item.price.current}, which triggered your price alert at $${priceWatch.desiredPrice}. \n\n Here is a link to the BestBuy website: ${priceWatch.item.url} \n\n Thank you for using our bestbuy price tracker. \n Have a wonderful day`
  let messageHTML = `<p>Hello,</p> \n\n Your item ${priceWatch.item.title} has reached the price of $${priceWatch.item.price.current}, which triggered your price alert at $${priceWatch.desiredPrice}.</p> \n\n <p>Here is a link to the <a href="${priceWatch.item.url}">BestBuy website</a> </p> \n\n <p>Thank you for using our bestbuy price tracker.</p> \n <p>Have a wonderful day</p>`

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"BB Price Tracker" ${process.env.MAIL_USERNAME}`, // sender address
    to: `${priceWatch.email}`, // list of receivers
    subject: `Your tracked item ${priceWatch.item.title.slice(0, 20) + '...'} has reached a low of $${priceWatch.item.price.current}`, // Subject line
    text: message, // plain text body
    html: messageHTML, // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

async function testEmail(priceWatch) {
    console.log('testing email')
    await mailOne(priceWatch).catch(console.error);
}

module.exports = {
  mailOne,
};
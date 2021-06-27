const nodemailer = require('nodemailer');
const environment = require('./environment');

module.exports = (to, token) => {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'bhatmahendramulraj@gmail.com',
      pass: 'srecbskusgvqxszr'
    }
  });
  
  var mailOptions = {
    from: 'bhatmahendramulraj@gmail.com',
    to: to,
    subject: 'CloudAsset Password Recovery Email',
    html: '<p>Hi, <br/><br/>Please click on the following link to reset your password: <br/>'+
    ' '+environment().baseurl+'/#/reset?t=' + token + '<br/><br/>Regards,<br/>CloudAsset</p>'
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      throw error;
 //   } else {
   //   console.log('Email sent: ' + info.response);
    }
  });
};

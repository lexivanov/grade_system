const nodemailer = require('nodemailer');
const hasher = require('./hasher');
const UserHashes = require("../models/userHashes");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'test.gradesystem@gmail.com',
    pass: 'gradeSYS1'
  }
});

var template = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"><html class=" js no-touch"><head><meta http-equiv="Content-Type" content="text/html; charset=utf-8" /><title></title></head><body style="width: 600px; margin: auto;">'

template += '<h1>Welcome to EPAM Training center, {name}!</h1>';
template += '<br>';
template += 'Your email: {email} <br>';
template += 'Your password: {password} <br>';
template += '<br>';
template += 'Verify your account by following this <a href="http://localhost:9000/verify/{hash}">link</a><br>';
template += '<br>';
template += 'Please, wait for approval from your teacher.<br>';
template += '</body></html>'

var mailOptions = {
  from: 'test.gradesystem@gmail.com',
  to: undefined,
  subject: 'Sending Email using Node.js',
  html: undefined
};

const getTemplate = (tempEMail, password, fullname) => {
  return template.replace('{name}', fullname).replace('{email}', tempEMail).replace('{password}', password);
}

exports.sendMail = function (tempEMail, password, fullname) {
  mailOptions.to = tempEMail;
  const userHash = hasher.createUserHash(fullname);
  hasher.saveUserHash({ userHash,tempEMail });

  mailOptions.html = getTemplate(tempEMail, password, fullname, userHash);

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
};
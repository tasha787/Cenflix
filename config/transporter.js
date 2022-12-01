"use strict";
const nodemailer = require("nodemailer");

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.email",
    service: "gmail",
    auth: {
      user: "yourscenflix@gmail.com",
      pass: "clbplnbhcplybikl",
    },
  });
//   eykoknwqehabnayt

module.exports = transporter;

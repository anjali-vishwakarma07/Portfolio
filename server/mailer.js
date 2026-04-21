const nodemailer = require("nodemailer");
const dns = require("dns");
require('dotenv').config();

dns.setDefaultResultOrder("ipv4first");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.email_user,
    pass: process.env.email_pass
  },
  tls: {
    rejectUnauthorized: false   // 🔥 FIX
  }
});

module.exports = transporter;
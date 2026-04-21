const express = require('express');
const router = express.Router();
const db = require('../db');
const transporter = require('../mailer');

// POST: save contact
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).send('All fields are required');
  }

  const sql = 'INSERT INTO contacts (name,email,message) VALUES (?,?,?)';

  // STEP 1: Save in DB
  db.query(sql, [name, email, message], async (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Database Error');
    }

    // STEP 2: Send Email
    try {
      await transporter.sendMail({
        from: `"Portfolio Contact" <anjali.vishwakarma0613@gmail.com>`,
        to: "anjali.vishwakarma0613@gmail.com",
        replyTo: email,
        subject: "New Contact Message 🚀",
        html: `
          <h3>New Message from Portfolio</h3>
          <p><b>Name:</b> ${name}</p>
          <p><b>Email:</b> ${email}</p>
          <p><b>Message:</b> ${message}</p>
        `
      });

      // SEND RESPONSE ONLY ONCE
      res.send("Message sent successfully");

    } catch (error) {
      console.log(error);

      // Email failed but DB saved
      res.status(500).send("Message saved but email failed");
    }
  });
});

module.exports = router;
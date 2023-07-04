require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyparser = require ('body-parser')
const nodemailer = require('nodemailer');
const app = express();
const port = process.env.PORT

app.use(cors());
app.use(express.json());
app.use(bodyparser.json())

const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
})


transport.verify((error) => {
if(error) {
    console.log(error)
} else {
    console.log("Mensaje enviado")
}
})

app.post('/contact', (req, res) => {
  const { firstName, lastName, email, phone, message } = req.body;

  const mail = {
    from: process.env.EMAIL_USER,
    to: 'jmalmendro74@gmail.com', // Reemplaza con tu dirección de correo electrónico
    subject: 'New contact form submission',
    html: `
      <p>You have received a new contact form submission:</p>
      <p>Name: ${firstName} ${lastName}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <p>Message: ${message}</p>
    `,
  };

  transport.sendMail(mail, (error) => {
    if (error) {
      console.error('Error sending email:', error);
      res.json({ code: 500, status: 'Failed to send email' });
    } else {
      res.json({ code: 200, status: 'Message Sent' });
    }
  });
});

app.listen(port, () => {
  console.log('Server is running on port 3001');
});
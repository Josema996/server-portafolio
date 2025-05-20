// api/contact.js para Vercel
const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { firstName, lastName, email, phone, message } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'jmalmendro74@gmail.com',
    subject: 'Nuevo contacto desde el portafolio',
    html: `
      <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Mensaje enviado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al enviar el mensaje' });
  }
};

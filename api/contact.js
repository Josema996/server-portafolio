const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method not allowed");
  }

  const { firstName, lastName, email, phone, message } = req.body;

  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mail = {
    from: process.env.EMAIL_USER,
    to: "jmalmendro74@gmail.com",
    subject: "Nuevo mensaje desde el portafolio",
    html: `
      <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone}</p>
      <p><strong>Mensaje:</strong> ${message}</p>
    `,
  };

  try {
    await transport.sendMail(mail);
    return res.status(200).json({ code: 200, status: "Message Sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ code: 500, status: "Failed to send email" });
  }
};

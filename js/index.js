const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Ruta del formulario
app.post('/send', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // Configura el transporte con tus datos (ej: Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tu_correo@gmail.com',
        pass: 'tu_contraseña_o_app_password'
      }
    });

    const mailOptions = {
      from: email,
      to: 'saradiaz.01214@gmail.com',
      subject: `[Contacto] ${subject}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Correo enviado con éxito' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error al enviar el correo' });
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

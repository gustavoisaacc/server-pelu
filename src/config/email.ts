import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Configuración del transporte
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: +process.env.SMTP_PORT,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Ejemplo de cómo enviar un correo
export async function sendEmail(
  to: string,
  name: string,
  subject: string,
  text: string
) {
  try {
    const info = await transporter.sendMail({
      from: '"Tu nombre" <tu_correo@example.com>', // Cambia por tu correo
      to: to,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 10px 0;
              background-color: #8e44ad;
              color: #ffffff;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 20px;
              color: #333333;
              line-height: 1.6;
            }
            .content p {
              margin: 10px 0;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #777777;
              padding: 10px;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              background-color: #8e44ad;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
            .button:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Gracias por registrarte!</h1>
            </div>
            <div class="content">
              <p>Hola, ${name}</p>
              <p>${text}</p>
              <p>Para confirmar tu cuenta, haz clic en el siguiente botón:</p>
              <a href="${
                process.env.FRONTEND_URL
              }/auth/confirm-account" class="button">Confirmar cuenta</a>
            </div>
            <div class="footer">
              <p>Este mensaje fue enviado automáticamente, por favor no respondas a este correo.</p>
              <p>&copy; ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log("Mensaje enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
}

// Ejemplo de cómo enviar un correo
export async function sendPasswordResetToken(
  to: string,
  name: string,
  subject: string,
  text: string
) {
  try {
    const info = await transporter.sendMail({
      from: '"Tu nombre" <tu_correo@example.com>', // Cambia por tu correo
      to: to,
      subject: subject,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>${subject}</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .header {
              text-align: center;
              padding: 10px 0;
              background-color: #8e44ad;
              color: #ffffff;
              border-radius: 8px 8px 0 0;
            }
            .header h1 {
              margin: 0;
              font-size: 24px;
            }
            .content {
              padding: 20px;
              color: #333333;
              line-height: 1.6;
            }
            .content p {
              margin: 10px 0;
            }
            .footer {
              text-align: center;
              font-size: 12px;
              color: #777777;
              padding: 10px;
            }
            .button {
              display: inline-block;
              padding: 10px 20px;
              margin: 20px 0;
              background-color: #8e44ad;
              color: #ffffff;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            }
            .button:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>¡Gracias por registrarte!</h1>
            </div>
            <div class="content">
              <p>Hola, ${name}</p>
              <p>${text}</p>
              <p>Para reestablecer tu password, haz clic en el siguiente botón:</p>
              <a href="${
                process.env.FRONTEND_URL
              }/auth/new-password" class="button">Confirmar cuenta</a>
            </div>
            <div class="footer">
              <p>Este mensaje fue enviado automáticamente, por favor no respondas a este correo.</p>
              <p>&copy; ${new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });
    console.log("Mensaje enviado: %s", info.messageId);
  } catch (error) {
    console.error("Error al enviar el correo: ", error);
  }
}
export const sendConfirmationEmails = (
  clientEmail: string,
  barberEmail: string,
  clientPhone: string,
  newReservation: any
) => {
  const subject = "Confirmación de Turno y Pago";
  const text = `¡Gracias por tu reserva! Tu cita está confirmada:
    Servicio: ${newReservation.name}
    Precio: $${newReservation.price}
    Duración: ${newReservation.duration}
    Fecha: ${newReservation.date}
    Hora: ${newReservation.startTime}
    Demora: ${newReservation.delay}
    Teléfono del cliente: ${clientPhone}`;

  // Enviar correo al cliente
  const clientMailOptions = {
    from: "tu-email@gmail.com",
    to: clientEmail,
    subject,
    text,
  };

  // Enviar correo al peluquero
  const barberMailOptions = {
    from: "tu-email@gmail.com",
    to: barberEmail,
    subject: `Nueva Reserva de Cita`,
    text: `Se ha confirmado una nueva cita:
      Cliente: ${clientEmail}
      Teléfono: ${clientPhone}
      ${text}`,
  };

  transporter.sendMail(clientMailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar correo al cliente:", error);
    } else {
      console.log("Correo enviado al cliente:", info.response);
    }
  });

  transporter.sendMail(barberMailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar correo al peluquero:", error);
    } else {
      console.log("Correo enviado al peluquero:", info.response);
    }
  });
};

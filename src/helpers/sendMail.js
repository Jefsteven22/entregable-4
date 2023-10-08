const jwt = require("jsonwebtoken");
const transporter = require("./mailer");
require("dotenv").config();
const ejs = require("ejs");
const path = require("path");
const getImages = require("./getImage");

const sendMail = (email, subject, templete, attachments) => {
  transporter.sendMail({
    to: email,
    subject,
    html: templete,
    attachments,
  });
};

const getTemplate = async (templatePath, templateVar) => {
  const emailTemplate = path.join(__dirname, templatePath);
  const template = await ejs.renderFile(emailTemplate, templateVar); // un obj con las variables que usare en el template
  return template;
};

const sendWolcomeEmail = async (email, data) => {
  // generar el token
  const token = jwt.sign({ email }, process.env.JWT_EMAIL_SECRET, {
    expiresIn: "3d",
    algorithm: "HS512",
  });
  // renderizar el template
  const template = await getTemplate("../views/welcome/wolcome-email.ejs", {
    ...data,
    token,
    url: process.env.FRONT_URL,
  });
  // obtener las imagenes a adjuntar
  const attachments = await getImages("/views/welcome/images");
  // enviar el correo
  sendMail(email, "Bienvenido a Academlo Chat", template, attachments);
};

module.exports = sendWolcomeEmail;

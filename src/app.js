// common js (cjs)
// import express from 'express';
const path = require("node:path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorRoutes = require("./routes/error.routes");
const apiv1Routes = require("./routes/apiv1.routes");
require("dotenv").config;

const PORT = process.env.PORT ?? 8000;
const app = express();

app.use(cors(), morgan("tiny"), express.json());
app.use("/avatar", express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.send("OK");
});

apiv1Routes(app);
errorRoutes(app);

app.listen(PORT, () =>
  console.log(`Servidor activo y escuchando en el puerto ${PORT}`)
);

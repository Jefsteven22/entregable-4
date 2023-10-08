// importamos las clases de errores de Sequelize
const {
  ConnectionError,
  ValidationError,
  DatabaseError,
} = require("sequelize");
const fs = require("node:fs/promises");
const path = require("node:path");

// necesitamos un midd para mostrar errores en la consola ( log errors)
const errorLogger = (err, req, res, next) => {
  const date = new Date().toLocaleString();
  console.log(err); // mostrar la fecha y hora en la que sucedio el error
  const filePath = path.join(__dirname, "../logs/logs.txt");
  fs.appendFile(
    filePath,
    `====================ERROR ${date}=========================\n`
  );
  fs.appendFile(filePath, JSON.stringify(err) + "\n\n");
  next(err);
};

const ormErrorHandler = (err, req, res, next) => {
  if (err instanceof ConnectionError) {
    // aqui llega un error lanzado en un controlador
    // verificamos si este error fue creado con la clase ConnectionError
    return res.status(409).json({
      error: "database connection error",
      message: err.name,
    });
  }
  // verificamos si el error fue creado con la clase ValidationError
  if (err instanceof ValidationError) {
    return res.status(400).json({
      error: err.name,
      message: err?.original?.detail,
      errors: err.errors,
    });
  }
  if (err instanceof DatabaseError) {
    return res.status(409).json({
      error: err.name,
      message: err.message,
      errors: err.errors,
    });
  }
  next(err);
};

// error
// {status, error, message}
const errorHandler = (err, req, res, next) => {
  const { status, ...error } = err;
  res.status(status || 500).json(error);
};

const notFoundErrorHandler = (req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: "The requested resource is not into the server",
  });
};

module.exports = {
  errorLogger,
  errorHandler,
  notFoundErrorHandler,
  ormErrorHandler,
};

// TODO tarea => escribir un manejador de errores para jwt

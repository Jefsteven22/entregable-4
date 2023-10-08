const { check, validationResult } = require("express-validator");
const validateResult = require("../../middlewares/validator.middleware");

const registerUserValidator = [
  check("firstname", "Error con firtname")
    .exists().withMessage('No se incluye la propiedad firstname')
    .notEmpty().withMessage('el firstname no debe estar vacio')
    .isString().withMessage('El valor del firstname debe ser String')
    .isLength({ min: 2, max: 50 }).withMessage('La longitud del nombre debe ser entre 2 y 50 caracteres')
    .matches(/^[a-zA-Z\s]/).withMessage('El firstname solo acepta letras'),
  check('lastname', 'Error con el lastname')
    .exists().withMessage('No se incluye la propiedad lastname')
    .notEmpty().withMessage('el lastname no debe estar vacio')
    .isString().withMessage('El valor del lastname debe ser String')
    .isLength({ min: 2, max: 50 }).withMessage('La longitud del nombre debe ser entre 2 y 50 caracteres')
    .matches(/^[a-zA-Z\s]/).withMessage('El lastname solo acepta letras'),
  check('email', 'Error con el campo Email')
    .exists().withMessage('No se incluye la propiedad email')
    .notEmpty().withMessage('la propiedad email no debe estas vacia')
    .isString().withMessage('la propiedad email debe ser string')
    .isEmail().withMessage('la propiedad email no tiene el formato de correo')
    .isLength({ min: 7, max: 50}).withMessage('la propiedad email ndebe ser minimo 7 y maximo 50 caracteres'),
  check('password', 'Error con el Pasword')
    .exists().withMessage('No se incluye la propiedad password')
    .notEmpty().withMessage('la propiedad password no debe estas vacia')
    .isString().withMessage('la propiedad password debe ser string')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*])[A-Za-z\d!@#$%-^&*]{8,}$/).withMessage('el password de ser minimo 8 caracteres, una mayuscula, una minuscula y un caracter especial'),
  validateResult
];

const loginValidator = [
  check('email', 'Error en la propiedad Email')
  .exists().withMessage('No se incluye la propiedad email')
  .notEmpty().withMessage('la propiedad email no debe estas vacia')
  .isString().withMessage('la propiedad email debe ser string')
  .isEmail().withMessage('la propiedad email no tiene el formato de correo')  ,
  check('password', 'Error con el Pasword')
    .exists().withMessage('No se incluye la propiedad password')
    .notEmpty().withMessage('la propiedad password no debe estas vacia')
    .isString().withMessage('la propiedad password debe ser string'),
  validateResult
  
]

module.exports= {
  registerUserValidator,
  loginValidator
}
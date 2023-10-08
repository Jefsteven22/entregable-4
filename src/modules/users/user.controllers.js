const jwt = require("jsonwebtoken");
const { User } = require("../../models");
const bcrypt = require("bcrypt");
require("dotenv").config();

const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};

const registerUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    // {firstname, lastname, email, password}
    // vamos a realizar una consulta a la base de datos
    // validar los datos
    await User.create(newUser);
    res.status(201).end();
    // enviar un correo al usuario
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    // null || {user}
    if (!user) {
      throw {
        status: 400,
        error: "User does not exist mid",
        message: "You need register before login",
      };
    }
    // contraseña en user.password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw {
        status: 400,
        error: "Incorrect password",
        message: "The password does not match with the user",
      };
    }

    if (!user.validEmail) {
      throw {
        status: 401,
        error: "Email verification needed",
        message: "Look at your email messages for a verification email",
      };
    }
    // Generar el Token
    const copyUser = { ...user.dataValues };
    delete copyUser.password;
    const token = jwt.sign(copyUser, process.env.JWT_SECRET, {
      algorithm: "HS512",
      expiresIn: "1h",
    });
    copyUser.token = token;
    res.json(copyUser);
  } catch (error) {
    next(error);
  }
};

const validateUserEmail = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      throw {
        status: 400,
        message: "Token is required",
      };
    }
    const { email } = jwt.verify(token, process.env.JWT_EMAIL_SECRET, {
      algorithms: "HS512",
    });
    const user = await User.findOne({ where: { email } }); // es una isntancia de ese usuario
    if (user.validEmail) {
      throw {
        status: 400,
        message: "Email is already verified",
      };
    }
    user.validEmail = true;
    user.save();
    res.json({
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

const uploadAvatar = async (req, res, next) => {
  try {
    const { file } = req;
    // construir una URL para la imagen
    // http://localhost:8001/avatars/1696388259083-2fcf7e1c3e57d993a11f90046a3c9fa6.jpg
    const imageUrl = `${process.env.APP_URL}/avatar/${file.filename}`;
    const { id } = req.params;
    await User.update(
      { avatar: imageUrl },
      {
        where: { id },
      }
    );
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  validateUserEmail,
  uploadAvatar,
  getAllUsers,
};

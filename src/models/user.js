"use strict";
const bcrypt = require("bcrypt");
const { Model } = require("sequelize");
require("dotenv").config();
const ejs = require("ejs");
const path = require("path");
const sendWolcomeEmail = require("../helpers/sendMail");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models: {User, Conversation, Message}
      User.hasMany(models.Message, { foreignKey: "senderId" });
      User.hasMany(models.Conversation, { foreignKey: "createdBy" });
      User.belongsToMany(models.Conversation, { through: "Participant" });
      User.hasMany(models.Participant, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      email: DataTypes.STRING,
      avatar: DataTypes.STRING,
      password: DataTypes.STRING,
      description: DataTypes.STRING,
      validEmail: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user, options) => {
          const hashed = await bcrypt.hash(user.password, 10);
          user.password = hashed;
        },
        afterCreate: async (user, options) => {
          const { email, firstname, lastname } = user;
          sendWolcomeEmail(email, { firstname, lastname });
        },
      },
    }
  );
  return User;
};

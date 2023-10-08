const { Router } = require("express");
const {
  registerUser,
  loginUser,
  validateUserEmail,
  uploadAvatar,
  getAllUsers,
} = require("./user.controllers");
const authenticate = require("../../middlewares/auth.middleware");
const { registerUserValidator, loginValidator } = require("./user.validator");
const upload = require("../../middlewares/imageUpload.middleware");

const router = Router();

router
  .route("/") // /api/v1/users
  .get(authenticate, getAllUsers)
  .post(registerUserValidator, registerUser)
  .get(authenticate, (req, res) => {
    res.json({ message: "aqui van tus mensajes" });
  });

router.put("/:id", authenticate, upload.single("avatar"), uploadAvatar);

router.post("/login", loginValidator, loginUser);

router.post("/validate", validateUserEmail);

module.exports = router;

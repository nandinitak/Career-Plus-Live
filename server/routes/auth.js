const express = require("express");
const {
  register,
  login,
  verifyEmail,
  googleLogin,
  decodeToken,
  checkUsername,
  validateToken,
} = require("../controllers/auth");
const {
  registerSchema,
  loginSchema,
  verifyEmailSchema,
  checkUserameSchema,
} = require("../schemas/authSchema");

const { validate } = require("../middlewares/validateSchema");
const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/verify", validate(verifyEmailSchema), verifyEmail);
router.get("/user/:username", validate(checkUserameSchema), checkUsername);
router.post("/google", googleLogin);
router.post("/decode-token", decodeToken);
router.get("/validate", validateToken);

module.exports = router;

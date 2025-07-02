const express = require("express");
const { signup, login, logout, updateProfile, checkAuth } = require("../controllers/auth.controller");
const { protectedRoute } = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.put("/updateProfile", protectedRoute, updateProfile);

router.get("/check", protectedRoute, checkAuth);

module.exports = router;
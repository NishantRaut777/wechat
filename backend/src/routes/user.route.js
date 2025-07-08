import express from "express";
import { protectedRoute } from "../middleware/auth.middleware.js"
import { addToFriends } from "../controllers/user.controller.js";

const router = express.Router();

router.put("/addToFriends", protectedRoute,  addToFriends);

export default router;
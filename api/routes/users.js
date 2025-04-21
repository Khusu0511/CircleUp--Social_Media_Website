import express from "express";
import { getUser, updateUser } from "../controllers/user.js";

const router = express.Router();

// Route to get a specific user's profile data
router.get("/find/:userId", getUser);

// Route to update the logged-in user's profile data
router.put("/", updateUser);

export default router;

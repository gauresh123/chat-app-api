import express from "express";
import { getUsers, signIn, signUp } from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/getusers/:ID", getUsers);

export default router;

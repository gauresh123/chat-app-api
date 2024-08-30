import express from "express";
import { getUsers, signIn, signUp } from "../controllers/userController.js";
import { addGroup, getGroup } from "../controllers/groupController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/getusers/:ID", getUsers);
router.post("/group/addgroup", addGroup);
router.get("/group/getgroup/:id", getGroup);

export default router;

import express from "express";
import { addMessage, getMessage } from "../controllers/messageController.js";

const router = express.Router();

router.post("/getMessage", getMessage);
router.post("/addMessage", addMessage);

export default router;

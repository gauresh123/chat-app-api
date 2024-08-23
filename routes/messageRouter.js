import express from "express";
import { getMessage } from "../controllers/messageController.js";

const router = express.Router();

router.get("/getMessage", getMessage);

export default router;

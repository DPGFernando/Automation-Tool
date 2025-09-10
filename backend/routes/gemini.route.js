import express from "express";
import { getGeminiResponse } from "../controllers/gemini.controllers.js";

const router = express.Router();

// ✅ API endpoint to generate Gemini response and Excel
router.post("/generate", getGeminiResponse);

export default router;

import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import ExcelJS from "exceljs";
import fs from "fs";
import path from "path";

dotenv.config();

const __dirname = path.resolve();
const excelDir = path.join(__dirname, "excel_files");
if (!fs.existsSync(excelDir)) fs.mkdirSync(excelDir);

export const getGeminiResponse = async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
            {
                contents: [{ parts: [{ text: prompt }] }]
            },
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        // Extract output safely
        let output = "No output received.";
        if (
            response.data.candidates &&
            response.data.candidates.length > 0 &&
            response.data.candidates[0].content.parts.length > 0
        ) {
            output = response.data.candidates[0].content.parts[0].text;
        }

        const csvMatch = output.match(/```csv([\s\S]*?)```/);
        const csvData = csvMatch ? csvMatch[1].trim() : null;

        if (!csvData) {
            return res.status(400).json({ error: "No CSV data found in Gemini output" });
        }

        const rows = csvData.split("\n").map((row) => row.split(","));
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Specifications");

        rows.forEach((row) => worksheet.addRow(row));
        const filename = `specifications_${Date.now()}.xlsx`;
        const filepath = path.join(excelDir, filename);
        await workbook.xlsx.writeFile(filepath);

        res.json({
            description: output,
            downloadUrl: `/excel/${filename}`,
        });
    } catch (error) {
        console.error("Gemini API Error:", error.response?.data || error.message);
        res.status(500).json({
            error: error.response?.data?.error?.message || "Gemini API request failed"
        });
    }
}
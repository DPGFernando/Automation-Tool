import express from "express";
import dotenv from "dotenv";
import getRoutes from "./routes/db.route.js";
import geminiRouter from "./routes/gemini.route.js";
import { connectDB } from "./db/connectDB.js";
import cors from 'cors';
import path from 'path';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(cors());

app.use(express.json());

app.use('/api/', getRoutes);
app.use("/api/gemini", geminiRouter);
app.use("/excel", express.static(path.join(__dirname, "excel_files")));

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/frontend/dist", "index.html"));
});

app.listen(PORT, () => {
    connectDB();
    console.log("Server running on ", PORT);
});
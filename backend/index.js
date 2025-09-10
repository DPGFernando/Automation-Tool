import express from "express";
import getRoutes from "./routes/db.route.js";
import geminiRouter from "./routes/gemini.route.js";
import { connectDB } from "./db/connectDB.js";
import cors from 'cors';
import path from 'path';

const app = express();
const __dirname = path.resolve();

app.use(cors());
const PORT = 5000;

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
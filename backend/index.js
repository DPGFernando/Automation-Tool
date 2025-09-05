import express from "express";
import getRoutes from "./routes/db.route.js";
import geminiRouter from "./controllers/gemini.controllers.js";
import { connectDB } from "./db/connectDB.js";
import cors from 'cors';

const app = express();

app.use(cors());
const PORT = 5000;

app.use(express.json());

app.use('/api/', getRoutes);
app.use("/api/gemini", geminiRouter);

app.listen(PORT, () => {
    connectDB();
    console.log("Server running on ", PORT);
});
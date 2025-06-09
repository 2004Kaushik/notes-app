import express, { Router } from 'express';
import cors from 'cors';
import path from "path";

import router from './routes/notesRoutes.js';
import { connectDB } from '../config/db.js';
import ratelimiter from '../middleware/ratelimiter.js';

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// middleware
if (process.env.NODE_ENV !== "production") {
    app.use(cors({
        origin: "http://localhost:5173", // Your frontend origin
        credentials: true               // If you're using cookies / sessions
    }));
}
app.use(ratelimiter);
app.use(express.json());

app.use("/api/notes", router);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"))
    })
}

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port: ", PORT);
    });
});


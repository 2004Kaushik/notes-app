import express, { Router } from 'express';
import cors from 'cors';

import router from './routes/notesRoutes.js';
import { connectDB } from '../config/db.js';
import ratelimiter from '../middleware/ratelimiter.js';

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true               // If you're using cookies / sessions
}));
app.use(ratelimiter);
app.use(express.json());

app.use("/api/notes", router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server is running on port: ", PORT);
    });
});


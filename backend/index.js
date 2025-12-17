import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { OpenAI } from "openai";

const app = express();

dotenv.config();
app.use(helmet());

app.use(
    cors({
        origin: process.env.FRONTEND_URL || "http://localhost:3000",
        credentials: true
    })
)

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes"
})
app.use(limiter);

const API_KEY = process.env.NEBIUS_API_KEY

const client = new OpenAI({
    baseURL: 'https://api.tokenfactory.nebius.com/v1/',
    apiKey: API_KEY,
});



app.use(express.json({ limit: "10mb" }));

app.post("/api/explain-code", (req, res) => {
    try {
        const { code, language } = req.body;
        if (!code || !language) {
            return res.status(400).json({ success: false, message: "Both code and language are required." });
        }

    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
})




client.chat.completions.create({
    "model": "openai/gpt-oss-120b",
    "messages": [
        {
            "role": "system",
            "content": "SYSTEM_PROMPT"
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "USER_MESSAGE"
                }
            ]
        }
    ]
})
    .then((response) => console.log(response));

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
})
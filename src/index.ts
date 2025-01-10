import { PrismaClient } from "@prisma/client"; // importing prisma client
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.router.js";
import todoRouter from "./routes/todo.router.js";

const prisma = new PrismaClient(); // connection setup

dotenv.config({
    path: "./.env"
});

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use("/v1/auth", authRouter);
app.use("/v1/todo", todoRouter);

app.listen(3000, async () => {
    console.log(`Server is running on port ${PORT}`);
    try {
        // Test database connection
        await prisma.$connect();
        console.log("DB connected");
    } catch (error) {
        console.error("Failed to connect to PostgreSQL:", error);
        process.exit(1); // Exit the process if the database connection fails
    }
});

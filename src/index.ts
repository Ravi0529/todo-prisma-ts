import { PrismaClient } from "@prisma/client"; // importing prisma client
import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route.js";
import todoRouter from "./routes/todo.route.js";

const prisma = new PrismaClient(); // connection setup

dotenv.config({
    path: "./.env"
});

const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/v1/auth", authRouter);
app.use("/v1/todo", todoRouter);

app.listen(port, async () => {
    console.log(`Server is running on port ${port}...`);
    try {
        await prisma.$connect();
        console.log("DB connected");
    } catch (error) {
        console.error("Failed to connect to PostgreSQL:", error);
        process.exit(1); // Exit the process if the database connection fails
    }
});

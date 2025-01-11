import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTodo = async (req: Request, res: Response): Promise<void> => {
    try {
        const { title, description, userId } = req.body;

        if (!title || !description || !userId) {
            res.status(400).json({ message: "Title, description, and userId are required" });
        }

        const newTodo = await prisma.todo.create({
            data: {
                title,
                description,
                userId
            },
        });

        res.status(201).json({ newTodo });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const getAllTodos = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const NumericId = parseInt(userId);

        if (isNaN(NumericId)) {
            res.status(400).json({ message: "Invalid userId" });
        }

        const todos = await prisma.todo.findMany({
            where: { userId: NumericId }
        });

        res.status(200).json({ todos })
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

import { Request, Response } from "express"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password, firstName, lastName, email } = req.body;

        const existingUsername = await prisma.user.findUnique({
            where: { username }
        });
        if (existingUsername) {
            res.status(409).json({ message: "Username already exists" });
        }

        const existingEmail = await prisma.user.findUnique({
            where: { email }
        });
        if (existingEmail) {
            res.status(409).json({ message: "Email already exists" });
        }

        const userCreated = await prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName,
                email,
            }
        })
        res.status(200).json({ userCreated });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username, password } = req.body;

        if (!username) {
            res.status(401).json({message: "Username required"});
        }
        if (!password) {
            res.status(401).json({message: "Password required"});
        }

        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            res.status(401).json({ message: "Username Not Found!" });
        }

        const newPassword = user?.password;
        if (newPassword !== password) {
            res.status(401).json({ message: "Invalid Password!" });
        }

        res.json({ message: "Logged In Successfully!", user });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error });
    }
}

import { PrismaClient } from "@prisma/client"; // importing prisma client

const prisma = new PrismaClient(); // connection setup

const createUser = async (username: string, password: string, firstName: string, lastName: string, email: string) => {
    const res = await prisma.user.create({
        data: {
            username,
            password,
            firstName,
            lastName,
            email
        }
    })
    console.log(res);
}
// createUser("");
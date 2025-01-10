import { PrismaClient } from "@prisma/client"; // importing prisma client

const prisma = new PrismaClient(); // connection setup

// create user
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

// create todo
const createTodo = async (userId: number, title: string, description: string) => {
    const todo = await prisma.todo.create({
        data: {
            userId,
            title,
            description
        }
    })
    console.log(todo);
}

// get all todos
const getTodos = async (userId: number) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId
        }
    })
    console.log(todos);
}

// get todos and user details
const getTodosAndUserDetails = async (userId: number) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId
        },
        select: {
            user: true,
            title: true,
            description: true
        }
    })
    console.log(todos);
}

// update todo
const updateTodo = async (todoId: number, title: string, description: string, done: boolean) => {
    const updatedTodo = await prisma.todo.update({
        where: {
            id: todoId
        },
        data: {
            title,
            description,
            done
        }
    })
    console.log(updatedTodo);
}

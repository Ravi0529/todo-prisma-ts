import express from 'express';
import { createTodo, getAllTodos } from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/createTodo", createTodo);
router.get("/allTodos/:id", getAllTodos);

export default router;

import express from 'express';
import {createTodo, updateTodo, getAllTodos, todosAndUser} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/createTodo", createTodo);
router.post("/updateTodo", updateTodo);
router.get("/allTodos", getAllTodos);
router.get("/displayAll", todosAndUser);

export default router;

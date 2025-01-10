import express from 'express';
import {createTodo, updateTodo, getAllTodos, todosAndUser} from "../controllers/todo.controller.js";

const router = express.Router();

router.get("/createTodo", createTodo);
router.get("/updateTodo", updateTodo);
router.get("/allTodos", getAllTodos);
router.get("/displayAll", todosAndUser);

export default router;

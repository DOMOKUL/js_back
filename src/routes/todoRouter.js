const express = require('express');
const todoController = require('../controllers/todoControllers');
const { asyncHandler } = require('../middlewares/middlewares');
const todoRouter = express.Router();

todoRouter.post('/', asyncHandler(todoController.createTodo));
todoRouter.get('/', asyncHandler(todoController.getTodos));
todoRouter.get('/:id', asyncHandler(todoController.getToDoID));
todoRouter.patch('/:id', asyncHandler(todoController.updateTodo));
todoRouter.delete('/', asyncHandler(todoController.deleteTodos));
todoRouter.delete('/:id', asyncHandler(todoController.deleteTodoID));

module.exports = todoRouter;